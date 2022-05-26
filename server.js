require("dotenv").config();
const express = require("express");
// const { Pool } = require("pg");

// const moment = require("moment");
const pool = require('./db/db.js')
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(express.static("static"));

app.get('/api/users', async (req, res) => {
    try {
        // const client = await pool.connect();
        const data = await pool.query("SELECT * FROM users;");
        // console.log(data);
        res.json(data.rows)
        // client.release();
    } catch (error) {
        console.error(error.message);
        res.send("error")
    }
})


app.post('/api/users', async (req, res) => {
    try {
        const data = await pool.query("INSERT INTO users (name, post) VALUES ($1, $2);", [req.body.name, req.body.post]);
        res.json(req.body);
    } catch (error) {
        console.error(error.message);
    }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
        const data = await pool.query("DELETE FROM users WHERE id = $1;", [req.params.id])
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})