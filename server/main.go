package main

import (
	"fmt"
	"net/http"

	"github.com/MurilojrMarques/golang-todo-list/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting the server on port 9000...")

	http.ListenAndServe(":9000", r)
}
