const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

// --------------------
// DATABASE CONNECTION
// --------------------
const pool = new Pool({
  user: "postgres",       // default PostgreSQL username
  host: "localhost",      // assuming your DB runs locally
  database: "homework",   // your database name
  password: "2857",       // your PostgreSQL password
  port: 5432,             // default port
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database: homework"))
  .catch(err => console.error("Connection error:", err.message));

// -------
// ROUTES
// -------

//
// example from homework
//

// GET: Retrieve all testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const result = await pool.query("SELECT author, message FROM testimonials");
    res.json(result.rows);
  } catch (err) {
    console.error("Error retrieving testimonials:", err.message);
    res.status(500).send("Error retrieving testimonials");
  }
});

//
// example from homework
//

// POST: Save a new testimonial
app.post("/api/testimonials/save", async (req, res) => {
  const { author, message } = req.body;

  if (!author || !message) {
    return res.status(400).json({ error: "Author and message are required." });
  }

  try {
    await pool.query(
      "INSERT INTO testimonials (author, message) VALUES ($1, $2)",
      [author, message]
    );
    res.status(201).json({ success: true, message: "Testimonial saved!" });
  } catch (err) {
    console.error("Error saving testimonial:", err.message);
    res.status(500).send("Error saving testimonial");
  }
});

//--------------
// Start Server
//--------------
app.listen(80, () => {
  console.log("Server running on port 80");
});
