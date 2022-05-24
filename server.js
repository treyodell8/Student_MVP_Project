require("dotenv").config();
const express = require("express");
// const { Pool } = require("pg");

// const moment = require("moment");
const pool = require('./db/db.js')
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

// const pool = new Pool({
//     user: 'wayneodell',
//     host: 'localHost',
//     database: 'blogdb',
//     password: 'secretpassword',
//     port: 5432,
    
//   });

app.use(express.static("static"));
console.log("test");

app.get('/api/users', async (req, res) => {
    try {
        console.log("User route");
        const client = await pool.connect();
        const data = await client.query("SELECT * FROM users;");
        console.log(data);
        res.json(data.rows)
        client.release();
    } catch (error) {
        console.error(error.message);
        res.send("error")
    }
})

app.get('/api/posts', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM posts;");
        res.json(data.rows)
    } catch (error) {
        console.error(error.message);
    }
})

// app.get('/pets/', async (req, res) => {
//     try {
//         const data = await pool.query("SELECT * FROM pets;");
//         res.json(data.rows)
//     } catch (err) {
//         console.error(err.message);
//     }
// })

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})