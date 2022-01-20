package utils

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Database init instancegg
func Database() *gorm.DB {
	dsn := "host=51.250.11.216 user=postgres password= dbname=harma port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Info)})
	if err != nil {
		println("Database Connection Error")
	} else {
		println("Database Connection Ok")
		return db
	}
	return db

}
