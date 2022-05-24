-- DROP DATABASE IF EXISTS blogdb;

-- CREATE DATABASE blogdb;

-- DROP TABLE IF EXISTS users;

-- DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    postid SERIAL PRIMARY KEY,
    post TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    postid INT REFERENCES posts(postid)
);
