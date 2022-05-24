const express = require("express");
// const { Pool } = require("pg");
const app = express();
const path = require("path");
require("dotenv").config();
// const moment = require("moment");
const db = require('./db/db')
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

app.get('/api/users', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM users");
        res.send(data.rows)
    } catch (error) {
        console.error(error.message);
    }
})

app.get('/api/posts', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM posts");
        res.send(data.rows)
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