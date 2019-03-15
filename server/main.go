package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// parse package.json, read the application port
func parsePackageJson(result *map[string]interface{}) {
	pJson, err := os.Open("package.json")
	if err != nil {
		log.Println("Read package json error:", err)
		return
	}

	defer pJson.Close()
	byteValue, _ := ioutil.ReadAll(pJson)
	json.Unmarshal([]byte(byteValue), &result)
}

func test(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)
	fmt.Fprintf(w, "haha")
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)
	http.ServeFile(w, r, "./dist/index.html")
}

func main() {
	// static file
	fs := http.FileServer(http.Dir("dist/"))
	http.Handle("/", fs)

	// match request
	http.HandleFunc("/door", homeHandler)
	http.HandleFunc("/box", homeHandler)
	http.HandleFunc("/ponzi", homeHandler)
	http.HandleFunc("/lottery", homeHandler)

	// parse json file
	var result map[string]interface{}
	parsePackageJson(&result)
	port := result["port"]

	log.Println(fmt.Sprintf("Server listening on port %s", port))
	http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
}
