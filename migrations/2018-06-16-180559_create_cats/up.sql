-- Your SQL goes here
CREATE TABLE cats (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  bio TEXT NOT NULL,
  kills INTEGER NOT NULL,
  image_url VARCHAR NOT NULL
);
