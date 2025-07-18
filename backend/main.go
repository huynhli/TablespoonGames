package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// database.ConnectPostGreSQL()
	// database.DisconnectPostGreSQL()

	app := fiber.New()

	SetupCors(app)

	app.Get("/", homePage)
	app.Post("/Email", createEmail)
	app.Delete("/Email", deleteEmail)

	err1 := app.Listen(":" + "3000")
	if err1 != nil {
		fmt.Println("Error starting server: ", err1)
	}
}

func homePage(c *fiber.Ctx) error {
	return c.SendString("Hello stranger")
}

func createEmail(c *fiber.Ctx) error {
	// receive email from frontend
	type EmailPayload struct {
		Email string `json:"email"`
	}
	var payload EmailPayload
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid JSON")
	}

	fmt.Println("Received email:", payload.Email)
	email := payload.Email

	// sanitize again for security ?

	// check for duplicates

	// insert into db
	supabaseAPIKey := os.Getenv("SUPABASE_API_KEY")
	supabaseURL := os.Getenv("SUPABASE_URL")
	data := map[string]string{
		"email": email,
	}

	fmt.Println("marshalling")
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshalling:", err)
		return fiber.NewError(fiber.StatusInternalServerError, "Server error")
	}

	fmt.Println("structuring post req")
	fmt.Println("Supabase URL:", supabaseURL)
	req, err := http.NewRequest("POST", supabaseURL+"/rest/v1/subscribers", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating HTTP request:", err)
		return fiber.NewError(fiber.StatusInternalServerError, "Server error")
	}

	req.Header.Set("apikey", supabaseAPIKey)
	req.Header.Set("Authorization", "Bearer "+supabaseAPIKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation") // return inserted rows

	fmt.Println("sending post req")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending HTTP request:", err)
		return fiber.NewError(fiber.StatusInternalServerError, "Server error")
	}
	defer resp.Body.Close()
	bodyBytes, _ := io.ReadAll(resp.Body)
	fmt.Println("Supabase response:", string(bodyBytes))

	fmt.Println("loading resp")
	if resp.StatusCode != http.StatusCreated {
		fmt.Println("error")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to add article")
	} else {
		fmt.Println("success")
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"message": "Email added successfully"})
	}
}

func deleteEmail(c *fiber.Ctx) error {
	return fiber.NewError(500, "Not implemented yet")
}

func SetupCors(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
}
