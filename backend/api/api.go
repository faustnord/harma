package api

import (
	"errors"
	"reflect"
	"strings"

	"github.com/iancoleman/strcase"
	"github.com/labstack/echo"
	"gorm.io/gorm"
)

var db *gorm.DB

// Db instance save
func Db(database *gorm.DB) {
	db = database
}

func Model(descriptor string) interface{} {
	switch descriptor {
	case "colors":
		return new(Color)
	case "note_items":
		return new(NoteItem)
	case "note_types":
		return new(NoteType)
	case "notes":
		return new(Note)
	case "tags":
		return new(Tag)
	case "users":
		return new(User)
	default:
		return nil
	}
}

func Models(descriptor string) interface{} {
	switch descriptor {
	case "colors":
		return new([]Color)
	case "note_items":
		return new([]NoteItem)
	case "note_types":
		return new([]NoteType)
	case "notes":
		return new([]Note)
	case "tags":
		return new([]Tag)
	case "users":
		return new([]User)
	default:
		return nil
	}
}

func isExist(model interface{}, field string) bool {
	m := reflect.ValueOf(model).Elem()
	for i := 0; i < m.NumField(); i++ {
		if m.Type().Field(i).Name == field {
			return true
		}
	}
	return false
}

func giveDescriptor(model interface{}, field string) string {
	m := reflect.ValueOf(model).Elem()
	for i := 0; i < m.NumField(); i++ {
		if m.Type().Field(i).Name == field {
			return m.Type().Field(i).Tag.Get("descriptor")
		}
	}
	return ""
}

func giveOperator(operator string) string {
	switch operator {
	case "eq":
		return " = ?"
	case "ne":
		return "NOT"
	case "lt":
		return " < ?"
	case "le":
		return " <= ?"
	case "gt":
		return " > ?"
	case "ge":
		return " >= ?"
	case "like":
		return " LIKE ?"
	case "or":
		return "OR"
	default:
		return ""
	}
}

func Routes(e *echo.Echo) {
	e.GET("/get/:model/:id", Get)
	e.GET("/get_all/:model", GetAll)
	e.POST("/create/:model", Create)
	e.PUT("/update/:model/:id", Update)
	e.DELETE("/delete/:model/:id", Delete)
}

func Get(c echo.Context) error {
	model := Model(c.Param("model"))
	chain := db
	if model == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if expand := c.QueryParam("expand"); expand != "" {
		sliceExpands := strings.Split(expand, ",")
		for _, e := range sliceExpands {
			sliceExpand := strings.Split(e, "/")
			parentModel := model
			for _, el := range sliceExpand {
				if !isExist(parentModel, el) {
					return echo.NewHTTPError(400, "Bad request expand. Not exist field '"+el+"'")
				}
				if descriptor := giveDescriptor(parentModel, el); descriptor != "" {
					parentModel = Model(descriptor)
				} else {
					return echo.NewHTTPError(500, "Internal server error. Field '"+el+"' is not expandable or not exist descriptor")
				}
			}
			e = strings.Join(sliceExpand, ".")
			chain = chain.Preload(e, func(db *gorm.DB) *gorm.DB {
				db = db.Order("ID")
				return db
			})
		}
	}
	if result := chain.First(model, c.Param("id")); result.Error != nil {
		return GormError(result.Error)
	}
	return c.JSON(200, model)
}

func GetAll(c echo.Context) error {
	models := Models(c.Param("model"))
	model := Model(c.Param("model"))
	chain := db
	if models == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if model == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if expand := c.QueryParam("expand"); expand != "" {
		sliceExpands := strings.Split(expand, ",")
		for _, e := range sliceExpands {
			sliceExpand := strings.Split(e, "/")
			parentModel := model
			for _, el := range sliceExpand {
				if !isExist(parentModel, el) {
					return echo.NewHTTPError(400, "Bad request expand. Not exist field '"+el+"'")
				}
				if descriptor := giveDescriptor(parentModel, el); descriptor != "" {
					parentModel = Model(descriptor)
				} else {
					return echo.NewHTTPError(500, "Internal server error. Field '"+el+"' is not expandable or not exist descriptor")
				}
			}
			e = strings.Join(sliceExpand, ".")
			chain = chain.Preload(e, func(db *gorm.DB) *gorm.DB {
				db = db.Order("ID")
				return db
			})
		}
	}
	if filter := c.QueryParam("filter"); filter != "" {
		sliceFilters := strings.Split(filter, ",")
		for _, f := range sliceFilters {
			if strings.Contains(f, "@") {
				sliceFilterOption := strings.Split(f, "@")
				if len(sliceFilterOption) != 2 {
					return echo.NewHTTPError(400, "Bad request filter. Invalid sintax")
				}
				if strings.Contains(sliceFilterOption[1], ":") {
					sliceFilter := strings.Split(sliceFilterOption[1], ":")
					if len(sliceFilter) != 3 {
						return echo.NewHTTPError(400, "Bad request filter. Invalid sintax")
					}
					if !isExist(model, sliceFilter[0]) {
						return echo.NewHTTPError(400, "Bad request filter. Not exist field '"+sliceFilter[0]+"'")
					}
					option := giveOperator(sliceFilterOption[0])
					if option == "" {
						return echo.NewHTTPError(400, "Bad request filter. Operator '"+sliceFilterOption[0]+"' is not valid")
					}
					operator := giveOperator(sliceFilter[1])
					if operator == "" {
						return echo.NewHTTPError(400, "Bad request filter. Operator '"+sliceFilter[1]+"' is not valid")
					}
					if option == "OR" {
						if operator == "NOT" {
							chain = chain.Or(db.Not(strcase.ToSnake(sliceFilter[0])+" = ?", sliceFilter[2]))
						} else if operator == " LIKE ?" {
							chain = chain.Or(db.Where("LOWER("+strcase.ToSnake(sliceFilter[0])+")"+operator, "%"+sliceFilter[2]+"%"))
						} else {
							chain = chain.Or(db.Where(strcase.ToSnake(sliceFilter[0])+operator, sliceFilter[2]))
						}
					} else {
						return echo.NewHTTPError(400, "Bad request filter. Operator '"+sliceFilterOption[0]+"' is not valid for 'or@' usage")
					}
				} else {
					return echo.NewHTTPError(400, "Bad request filter. Invalid sintax")
				}
			} else {
				if strings.Contains(f, ":") {
					sliceFilter := strings.Split(f, ":")
					if len(sliceFilter) != 3 {
						return echo.NewHTTPError(400, "Bad request filter. Invalid sintax")
					}
					if !isExist(model, sliceFilter[0]) {
						return echo.NewHTTPError(400, "Bad request filter. Not exist field '"+sliceFilter[0]+"'")
					}
					operator := giveOperator(sliceFilter[1])
					if operator == "" {
						return echo.NewHTTPError(400, "Bad request filter. Operator '"+sliceFilter[1]+"' is not valid")
					}
					if operator == "NOT" {
						chain = chain.Not(strcase.ToSnake(sliceFilter[0])+" = ?", sliceFilter[2])
					} else if operator == " LIKE ?" {
						chain = chain.Where("LOWER("+strcase.ToSnake(sliceFilter[0])+")"+operator, "%"+sliceFilter[2]+"%")
					} else {
						chain = chain.Where(strcase.ToSnake(sliceFilter[0])+operator, sliceFilter[2])
					}
				} else {
					return echo.NewHTTPError(400, "Bad request filter. Invalid sintax")
				}
			}

		}
	}
	if sort := c.QueryParam("sort"); sort != "" {
		sliceSorts := strings.Split(sort, ",")
		for _, s := range sliceSorts {
			if strings.Contains(s, "@") {
				sliceSort := strings.Split(s, "@")
				if !isExist(model, sliceSort[0]) {
					return echo.NewHTTPError(400, "Bad request sort. Not exist field '"+sliceSort[0]+"'")
				}
				if sliceSort[1] == "desc" {
					s = sliceSort[0] + " " + sliceSort[1]
				} else {
					return echo.NewHTTPError(400, "Bad request sort. You want use 'desc'?")
				}
			} else {
				if !isExist(model, s) {
					return echo.NewHTTPError(400, "Bad request sort. Not exist field '"+s+"'")
				}
			}
			chain = chain.Order(strcase.ToSnakeWithIgnore(s, " "))
		}
	}
	if result := chain.Find(models); result.Error != nil {
		return GormError(result.Error)
	}
	return c.JSON(200, models)
}

func Create(c echo.Context) error {
	model := Model(c.Param("model"))
	if model == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if err := c.Bind(model); err != nil {
		return echo.NewHTTPError(400, "Bad request, not bind")
	}
	if err := c.Validate(model); err != nil {
		return echo.NewHTTPError(400, "Bad request, not validate")
	}
	if result := db.Create(model); result.Error != nil {
		return GormError(result.Error)
	}
	return c.JSON(201, model)
}

func Update(c echo.Context) error {
	model := Model(c.Param("model"))
	if model == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if result := db.First(model, c.Param("id")); result.Error != nil {
		return GormError(result.Error)
	}
	if err := c.Bind(model); err != nil {
		return echo.NewHTTPError(400, "Bad request, not bind")
	}
	if err := c.Validate(model); err != nil {
		return echo.NewHTTPError(400, "Bad request, not validate")
	}
	if result := db.Save(model); result.Error != nil {
		return GormError(result.Error)
	}
	return c.JSON(200, model)
}

func Delete(c echo.Context) error {
	model := Model(c.Param("model"))
	if model == nil {
		return echo.NewHTTPError(404, "Not found model")
	}
	if result := db.Delete(model, c.Param("id")); result.Error != nil {
		return GormError(result.Error)
	}
	return c.JSON(200, "Successfully deleted")
}

// GormError handler
func GormError(err error) *echo.HTTPError {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return echo.NewHTTPError(404, "Not found record")
	} else if errors.Is(err, gorm.ErrInvalidTransaction) {
		return echo.NewHTTPError(500, "No valid transaction")
	} else if errors.Is(err, gorm.ErrNotImplemented) {
		return echo.NewHTTPError(500, "Not implemented")
	} else if errors.Is(err, gorm.ErrMissingWhereClause) {
		return echo.NewHTTPError(500, "WHERE conditions required")
	} else if errors.Is(err, gorm.ErrUnsupportedRelation) {
		return echo.NewHTTPError(500, "Unsupported relations")
	} else if errors.Is(err, gorm.ErrPrimaryKeyRequired) {
		return echo.NewHTTPError(500, "Primary key required")
	} else if errors.Is(err, gorm.ErrModelValueRequired) {
		return echo.NewHTTPError(500, "Model value required")
	} else if errors.Is(err, gorm.ErrInvalidData) {
		return echo.NewHTTPError(500, "Unsupported data")
	} else if errors.Is(err, gorm.ErrUnsupportedDriver) {
		return echo.NewHTTPError(500, "Unsupported driver")
	} else if errors.Is(err, gorm.ErrRegistered) {
		return echo.NewHTTPError(500, "Registered")
	} else if errors.Is(err, gorm.ErrInvalidField) {
		return echo.NewHTTPError(500, "Invalid field")
	} else if errors.Is(err, gorm.ErrEmptySlice) {
		return echo.NewHTTPError(500, "Empty slice found")
	} else if errors.Is(err, gorm.ErrDryRunModeUnsupported) {
		return echo.NewHTTPError(500, "Dry run mode unsupported")
	} else if errors.Is(err, gorm.ErrInvalidValue) {
		return echo.NewHTTPError(500, "Invalid value")
	} else if errors.Is(err, gorm.ErrInvalidValueOfLength) {
		return echo.NewHTTPError(500, "Invalid association values, length doesn't match")
	} else {
		return echo.NewHTTPError(500, err.Error())
	}
}
