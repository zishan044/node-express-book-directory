const express = require("express")
const dotenv = require("dotenv")
const db = require("./queries")

dotenv.config()

const port = process.env.PORT || "8000"

const app = express()
app.use(express.json())

app.get("/", db.getBooks)
app.post("/", db.createBook)
app.get("/:id", db.getBookById)
app.patch("/:id", db.updateBookById)
app.delete("/:id", db.deleteBook)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})