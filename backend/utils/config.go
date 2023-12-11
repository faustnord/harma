package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Config of project
func Config() {
	if os.Getenv("ENV") == "production" {
		err := godotenv.Load(".env.production")
		if err != nil {
			log.Println("Error loading '.env.production' file")
		} else {
			log.Println("Add variables from '.env.production' file")
		}
	} else {
		err := godotenv.Load(".env.development")
		if err != nil {
			log.Println("Error loading '.env.development' file")
		} else {
			log.Println("Add variables from '.env.development' file")
		}
	}
	godotenv.Load()

}
