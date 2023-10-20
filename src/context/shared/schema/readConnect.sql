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
CREATE TABLE book (
    id_b INTEGER,
    u_id INTEGER REFERENCES users(id_u),
    b_title TEXT,
    b_isbn TEXT,
    b_pageCount INTEGER,
    b_publishedDate TIMESTAMP,
    b_thumbnailUrl TEXT,
    b_shortDescription TEXT,
    b_longDescription TEXT,
    b_status TEXT,
    b_authors TEXT[], 
    b_categories TEXT[]
);