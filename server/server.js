// Import setup
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

// Set up the port for the server to listen on
const PORT = 8080; // Port explicitly set to 5000

// Start server on specified port (5000)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("This is the root route");
});

// Connection string
const dbConnectionString = process.env.DATABASE_URL;

// Databse pool setup
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

// Read from database
app.get("/guestbook", async (req, res) => {
  const query = await db.query(`SELECT * FROM guestbook`);
  res.json(query.rows);
});

// Create new data (Insert new guestbook entry)
app.post("/guestbook", async (req, res) => {
  const { name, message } = req.body; // Get name and message from the request body

  // Insert the new guestbook entry into the database
  const query = await db.query(
    `INSERT INTO guestbook (name, message) VALUES ($1, $2) RETURNING *`,
    [name, message]
  );
  res.status(201).json(query.rows[0]); // Return the inserted row as a response
});
