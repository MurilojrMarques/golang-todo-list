package main

import (
	"fmt"
	"golang-todo-list/router"
	"net/http"
)

func main() {
	r := router.Router()
	fmt.Println("Starting the server on port 9000...")

	http.ListenAndServe(":9000", r)
}
