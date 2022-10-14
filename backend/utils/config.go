package utils

import (
	"log"

	"github.com/joho/godotenv"
)

// Config of project
func Config() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Println("Error loading '.env.local' file")
		godotenv.Load()
	}

}
