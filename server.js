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
  connectionString: process.env.DB_CONN || "postgresql://postgres:postgres@localhost:5432/homework",
  ssl: process.env.DB_CONN ? { rejectUnauthorized: false } : false
});

         
;  //MAKE SURE YOU HAVE THIS STUFF SET UP PROPERLY ON  PGAdmin -- AND USE http://localhost:3000
// -------------------------
// Sign in and Log in stuff
// -------------------------
// sign up profile creation
app.post("/api/signup", async (req, res) => {
    const { username, password, isChef, description } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Insert into Profile table
        await client.query(
            `INSERT INTO Profile (username, password, is_chef)
             VALUES ($1, $2, $3)`,
            [username, password, isChef]
        );

        // If user is a chef, insert into Chefs table too
        if (isChef === "Y") {
            await client.query(
                `INSERT INTO Chef (username, avg_rating, description)
                 VALUES ($1, 0, $2)`,
                [username, description]
            );
        }

        await client.query("COMMIT");
        res.status(201).json({ message: "Profile created successfully" });

    } catch (err) {
        await client.query("ROLLBACK");
        console.error(err);

        if (err.code === "23505") {
            res.status(400).json({ error: "Username already exists" });
        } else {
            res.status(500).json({ error: "Server error" });
        }

    } finally {
        client.release();
    }
});

// log in system
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            `SELECT username, is_chef 
             FROM Profile 
             WHERE username = $1 AND password = $2`,
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Login successful
        res.json({
            message: "Login successful",
            user: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//----------------
//bookings table stuff
//----------------
app.get("/api/bookings", async (req, res) => {
  const result = await pool.query(`
    SELECT booking_id, booker_username, chef_username, booking_date, status
    FROM bookings;
  `);

  res.json(result.rows);
});

//Create a new booking
app.post("/api/bookings", async (req, res) => {
  const { booker_username, chef_username, booking_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings (booker_username, chef_username, booking_date, status)
       VALUES ($1, $2, $3, 'PENDING')
       RETURNING booking_id`,
      [booker_username, chef_username, booking_date]
    );

    res.status(201).json({ 
      message: "Booking request successful", 
      booking_id: result.rows[0].booking_id 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//--------------
// Start Server
//--------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
