package utils

import (
	"harma/api"

	"github.com/labstack/echo"
)

// Routes of project
func Routes(e *echo.Echo) {
	api.Routes(e)
}
