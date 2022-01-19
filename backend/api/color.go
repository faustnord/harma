package api

import (
	"time"

	"gorm.io/gorm"
)

type Color struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string
	Color     string
	TextColor string
	Notes     *[]Note `json:",omitempty" descriptor:"notes"`
	Tags      *[]Tag  `json:",omitempty" descriptor:"tags"`
}
