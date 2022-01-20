export interface Models {
    Color?:    Color;
    Note?:     Note;
    NoteItem?: NoteItem;
    NoteType?: NoteType;
    Tag?:      Tag;
    User?:     User;
}

export interface Tag {
    ColorID?:   number;
    CreatedAt?: Date;
    Icon?:      string;
    ID?:        number;
    Name?:      string;
    Notes?:     Note[];
    UpdatedAt?: Date;
}

export interface Note {
    Archived?:  boolean;
    CheckList?: boolean;
    Color?:     Color;
    ColorID?:   number;
    CreatedAt?: Date;
    Header?:    string;
    ID?:        number;
    NoteItems?: NoteItem[];
    Pinned?:    boolean;
    Tags?:      Tag[];
    Text?:      string;
    UpdatedAt?: Date;
    UserID?:    number;
}

export interface Color {
    Color?:     string;
    CreatedAt?: Date;
    ID?:        number;
    Name?:      string;
    Notes?:     Note[];
    Tags?:      Tag[];
    TextColor?: string;
    UpdatedAt?: Date;
}

export interface NoteItem {
    CreatedAt?: Date;
    Done?:      boolean;
    ID?:        number;
    NoteID?:    number;
    Position?:  number;
    Text?:      string;
    UpdatedAt?: Date;
}

export interface NoteType {
    CreatedAt?: Date;
    ID?:        number;
    Name?:      string;
    UpdatedAt?: Date;
}

export interface User {
    CreatedAt?: Date;
    Email?:     string;
    ID?:        number;
    Name?:      string;
    Notes?:     Note[];
    Password?:  string;
    Surname?:   string;
    UpdatedAt?: Date;
}
