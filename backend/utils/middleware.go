package utils

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// Middleware of project
func Middleware(e *echo.Echo) {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))
}
