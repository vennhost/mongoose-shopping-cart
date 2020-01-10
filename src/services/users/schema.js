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
  price: Number,
  quantity: Number
});

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String
  },
  cart: [BookSchema]
});

module.exports = mongoose.model("User", UserSchema);
