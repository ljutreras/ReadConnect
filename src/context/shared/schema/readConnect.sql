CREATE DATABASE read_connect;

CREATE TABLE login(
    id_l SERIAL PRIMARY KEY,
    l_first_name TEXT NOT NULL,
    l_last_name TEXT NOT NULL,
    l_email TEXT NOT NULL UNIQUE,
    l_password TEXT NOT NULL,
);

CREATE TABLE profile(
    id_p SERIAL PRIMARY KEY,
    l_id INTEGER REFERENCES LOGIN(id_l),
    p_first_name TEXT NOT NULL,
    p_last_name TEXT NOT NULL,
    p_email TEXT NOT NULL UNIQUE,
    p_books_readed TEXT NOT NULL,
    p_books_to_read TEXT NOT NULL,
);
CREATE TABLE book (
    id_b INTEGER,
    p_id INTEGER REFERENCES profile(id_p)
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