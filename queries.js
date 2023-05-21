const pg = require("pg")
const dotenv = require("dotenv")

dotenv.config()

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

const getBooks = (req, res) => {
    pool.query("SELECT * FROM books ORDER BY id ASC", (err, books) => {
        if (err) {
            throw err
        }
        res.status(200).json(books.rows)
    })
}

const createBook = (req, res) => {
    const {title, author, pages} = req.body
    pool.query("INSERT INTO books(title, author, pages) VALUES($1, $2, $3)", [title, author, pages], (err, book) => {
        if (err) {
            throw err
        }
        res.status(201).json({"msg": "book successfully created"})
    })
}

const getBookById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query("SELECT * FROM books WHERE id = $1", [id], (err, book) => {
        if (err) {
            throw err
        }
        res.status(200).json(book.rows)
    })
}

const updateBookById = (req, res) => {
    const id = parseInt(req.params.id)
    const {title, author, pages} = req.body
    pool.query("UPDATE books SET title = $1, author = $2, pages = $3 WHERE id = $4", [title, author, pages, id], (err, book) => {
        if (err) {
            throw err
        }
        res.status(201).json({"msg": "book successfully updated"})
    })
}

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query("DELETE FROM books WHERE id = $1", [id], (err, book) => {
        if (err) {
            throw err
        }
        res.status(200).json({"msg": "book successfully deleted"})
    })
}

module.exports = {
    getBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBook
}