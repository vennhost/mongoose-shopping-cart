const express = require("express");

const Book = require("./schema");

const router = express.Router();

router.get("/", async (req, res) => {
  // GET /books?title=Shining
  if (req.query.title) {
    const books = await Book.find({ title: req.query.title });
    res.send(books);
  }
  const books = await Book.find({});
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  //const book = await Book.find({_id: ObjectId(req.params.id}))
  if (book) {
    res.send(book);
  } else {
    res.send("Not Found");
  }
});

router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const { _id } = await book.save();
    res.status(201).send(_id);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = Book.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (book) {
    }
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const book = Book.findOneAndDelete({ _id: req.params.id });
  } catch (error) {}
});

module.exports = router;
