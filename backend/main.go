package main

import (
	"galagram/api"
	"galagram/utils"

	"github.com/labstack/echo"
)

func main() {
	// Echo instance
	e := echo.New()

	// Config
	c := utils.Config()

	// Database
	db := utils.Database()

	// Migrations
	utils.Migrate(db)

	// Middleware
	utils.Middleware(e)

	// Validators
	utils.Validate(e)

	// Seeds
	utils.Seeds(db)

	// Routes
	utils.Routes(e)

	// Schema
	utils.Schema()

	// Api
	api.Db(db)

	// Start server
	e.Logger.Fatal(e.Start(c.Port))
}
