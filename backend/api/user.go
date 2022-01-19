package api

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string
	Surname   string
	Email     string
	Password  string  `json:",omitempty" gorm:"->:false;<-"`
	Notes     *[]Note `json:",omitempty" descriptor:"notes"`
}
