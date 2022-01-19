package api

import (
	"time"

	"gorm.io/gorm"
)

type Tag struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string
	Icon      string
	ColorID   uint
	Notes     *[]Note `gorm:"many2many:note_tags;" json:",omitempty" descriptor:"notes"`
}
