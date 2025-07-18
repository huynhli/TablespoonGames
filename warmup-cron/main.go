package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	url := os.Getenv("BACKEND_URL")
	if url == "" {
		log.Fatalf("No url")
	}

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalf("Warmup failed: %v", err)
	}
	defer resp.Body.Close()

	log.Printf("Warmup ping successful. Status: %s", resp.Status)
}
