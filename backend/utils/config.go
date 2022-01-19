package utils

type Configuration struct {
	Port string
}

// Config of project
func Config() *Configuration {
	c := new(Configuration)
	c.Port = ":4444"
	return c
}
