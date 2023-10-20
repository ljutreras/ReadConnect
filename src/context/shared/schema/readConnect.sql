CREATE DATABASE read_connect;

CREATE TABLE login(
    id_l SERIAL PRIMARY KEY,
    l_first_name TEXT NOT NULL,
    l_last_name TEXT NOT NULL,
    l_email TEXT NOT NULL UNIQUE,
    l_password TEXT NOT NULL,
);

CREATE TABLE users (
    id_u SERIAL PRIMARY KEY,
    u_first_name TEXT NOT NULL,
    u_last_name TEXT NOT NULL,
    u_email TEXT NOT NULL UNIQUE,
    u_books_readed TEXT NOT NULL,
    u_books_to_read TEXT NOT NULL,
    u_password TEXT NOT NULL
);
CREATE TABLE books (
    _id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES users(id_u),
    title TEXT,
    isbn TEXT,
    pageCount INTEGER,
    publishedDate TEXT,
    thumbnailUrl TEXT,
    shortDescription TEXT,
    longDescription TEXT,
    status TEXT,
    authors TEXT[], 
    categories TEXT[]
);