import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book_library", // Apne database ka naam yahaan daalein
  password: "Omgupta@4546", // Apne password daalein
  port: 3000,
});
db.connect();
app.set("view engine", "ejs");

// Home pages show all books
app.get("/", async(req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY read_date DESC");
    const books = result.rows;
    res.render("home.ejs", {books: books})
  } catch(err) {
    console.log(err);
  }
});

// add books
app.get("/add-book", (req, res) => {
    res.render("add.ejs");
});
app.post("/add", async (req, res) => {
  const { title, author, notes, rating, read_date, isbn } = req.body;

  try {
    await db.query(
      "INSERT INTO books (title, author, notes, rating, read_date, isbn) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, notes, rating, read_date, isbn]
    );
    console.log("New book added successfully!");
    res.redirect("/"); // Success hone par home page par wapas redirect kar denge
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete books
app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM books WHERE book_id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Internal Server Error");
    }
});
// GET Route to render the edit form with pre-filled data
app.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM books WHERE book_id = $1", [id]);
        const book = result.rows[0];
        if (book) {
            res.render("edit-book.ejs", { book: book });
        } else {
            res.status(404).send("Book not found.");
        }
    } catch (err) {
        console.error("Error fetching book for editing:", err);
        res.status(500).send("Internal Server Error");
    }
});

// POST Route to update the book in the database
app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { title, author, notes, rating, read_date, isbn } = req.body;
    try {
        await db.query(
            "UPDATE books SET title = $1, author = $2, notes = $3, rating = $4, read_date = $5, isbn = $6 WHERE book_id = $7",
            [title, author, notes, rating, read_date, isbn, id]
        );
       
        res.redirect("/");
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});