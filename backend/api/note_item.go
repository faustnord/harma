package api

import (
	"time"

	"gorm.io/gorm"
)

type NoteItem struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Text      string
	Done      bool
	Position  uint
	NoteID    uint
}
