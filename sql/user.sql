-- creating table for user
-- user is reserved keyword in postgresql

CREATE TABLE Account(
    user_id SERIAL PRIMARY KEY,
    googleId VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
