package utils

import (
	"harma/api"

	"gorm.io/gorm"
)

// Migrate models
func Migrate(db *gorm.DB) {
	db.AutoMigrate(
		api.User{},
		api.Color{},
		api.NoteItem{},
		api.NoteType{},
		api.Note{},
		api.Tag{},
	)
}
