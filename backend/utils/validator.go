package utils

import (
	"github.com/labstack/echo"
	"gopkg.in/go-playground/validator.v9"
)

// Validator struct
type Validator struct {
	validator *validator.Validate
}

// Validate of something
func (v *Validator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

// Validate project
func Validate(e *echo.Echo) {
	e.Validator = &Validator{validator: validator.New()}
}
