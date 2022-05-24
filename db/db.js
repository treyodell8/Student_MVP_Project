const { Pool } = require('pg');
// require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthroized: false
    }
});

module.exports = pool;