package utils

import (
	"log"

	"github.com/joho/godotenv"
)

// Config of project
func Config() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
