package api

import (
	"time"

	"gorm.io/gorm"
)

type NoteType struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string
}
