const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  price: Number
});

const booksCollection = mongoose.model("book", BookSchema);

module.exports = booksCollection;
