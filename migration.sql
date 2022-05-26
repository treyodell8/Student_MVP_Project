-- DROP DATABASE IF EXISTS blogdb;

-- CREATE DATABASE blogdb;

DROP TABLE IF EXISTS users;

-- DROP TABLE IF EXISTS posts;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    post TEXT
);

-- CREATE TABLE posts (
--     postid SERIAL PRIMARY KEY,
--     post TEXT,
--     userid INT REFERENCES users(id)
-- );