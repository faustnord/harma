package utils

import (
	"encoding/json"
	"fmt"
	"harma/api"
	"io/ioutil"

	"github.com/alecthomas/jsonschema"
)

type AllModels struct {
	Color    api.Color
	NoteItem api.NoteItem
	NoteType api.NoteType
	Note     api.Note
	Tag      api.Tag
	User     api.User
}

// Generate JSON Schema file
func Schema() {
	reflector := jsonschema.Reflector{
		RequiredFromJSONSchemaTags: true,
		ExpandedStruct:             true,
	}
	models := reflector.Reflect(new(AllModels))
	file, err := json.MarshalIndent(models, "", "    ")
	if err != nil {
		fmt.Println(err)
	}
	if err := ioutil.WriteFile("../frontend/src/api/models.json", file, 0644); err != nil {
		fmt.Println(err)
	}
}
