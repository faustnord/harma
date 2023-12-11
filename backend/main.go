package main

import (
	"harma/api"
	"harma/utils"
	"os"

	"github.com/labstack/echo"
)

func main() {
	// Echo instance
	e := echo.New()

	// Config
	utils.Config()

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

	// Serving static files
	e.Static("/", "build")

	// Start server
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
