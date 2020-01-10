const express = require("express");
const { ObjectID } = require("mongodb");

const userSchema = require("./schema");
const bookSchema = require("../books/schema");

const router = express.Router();

router.get("/:id", async (req, res) => {}); // GET http:localhost:3000/users/1234 to READ a single user by id

router.get("/", async (req, res) => {}); // GET http:localhost:3000/users?name=john to LIST the users filtered by name

router.post("/", async (req, res) => {}); // POST http:localhost:3000/users/ to CREATE a single user

router.put("/:id", async (req, res) => {}); // PUT http:localhost:3000/users/ to UPDATE a single user

router.delete("/:id", async (req, res) => {}); // DELETE http:localhost:3000/users/1234 to DELETE a single user

router.post("/:id/add-to-cart/:bookId", async (req, res) => {
  try {
    //1. Find the book by ID
    const book = await bookSchema.findById(req.params.bookId);

    const newBook = { ...book.toObject(), quantity: 1 };

    //2. Check in user's cart if the book is already there

    const response = await userSchema.find({
      _id: req.params.id,
      cart: { $elemMatch: { _id: new ObjectID(req.params.bookId) } }
    });
    if (response.length > 0) {
      // the book is already in the cart
      //3. Increment the quantity
      await userSchema.updateOne(
        { _id: req.params.id, "cart._id": new ObjectID(req.params.bookId) },
        { $inc: { "cart.$.quantity": 1 } }
      );
      res.send("Quantity incremented");
    } else {
      // the book is not in the cart
      //4. Add to cart
      await userSchema.updateOne(
        { _id: req.params.id },
        { $addToSet: { cart: newBook } }
      );
      res.send("New book added!");
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id/remove-from-cart/:bookId", async (req, res) => {
  try {
    await userSchema.findByIdAndUpdate(req.params.id, {
      $pull: { cart: { _id: req.params.bookId } }
    });
    res.send("Ok");
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id/calculate-cart-total", async (req, res) => {
  try {
    const { cart } = await userSchema.findById(req.params.id);

    const total = cart.reduce(
      (prev, curr) => prev.price * prev.quantity + curr.price * curr.quantity
    );
    res.send({ total });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
