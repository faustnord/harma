package api

import (
	"time"

	"gorm.io/gorm"
)

type Note struct {
	ID        uint `gorm:"primarykey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Header    string
	Text      string
	ColorID   uint
	Color     *Color `json:",omitempty" descriptor:"colors"`
	UserID    uint
	Pinned    bool
	Archived  bool
	CheckList bool
	NoteItems *[]NoteItem `json:",omitempty" descriptor:"note_items"`
	Tags      *[]Tag      `gorm:"many2many:note_tags;" json:",omitempty" descriptor:"tags"`
}
