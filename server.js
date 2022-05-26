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

// app.get('/api/posts', async (req, res) => {
//     try {
//         const data = await pool.query("SELECT ");
//         res.json(data.rows)
//     } catch (error) {
//         console.error(error.message);
//     }
// })

app.post('/api/users', async (req, res) => {
    try {
        const data = await pool.query("INSERT INTO users (name, post) VALUES ($1, $2);", [req.body.name, req.body.post]);
        res.json(req.body);
    } catch (error) {
        console.error(error.message);
    }
})




// app.post('/api/posts', async (req, res) => {
//     // let data;
//     // try {
//     //     data = await pool.query(`SELECT * FROM users WHERE name = `)
//     // } catch (error) {
        
//     // }
//     try {
//         const data = await pool.query(`INSERT INTO posts (post) VALUES ('${req.body.post}');`);
//         res.json(req.body);
//     } catch (error) {
//         console.error(error.message);
//     }
// })

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})