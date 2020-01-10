const express = require("express");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const usersRouter = require("./src/services/users");
const booksRouter = require("./src/services/books");

const LoggerMiddleware = (req, res, next) => {
  console.log(`${req.url} ${req.method} -- ${new Date()}`);
  next();
};

const server = express(); // Create http server with express

const port = process.env.PORT;

//server.use(requireJSONContentOnlyMiddleware());
server.use(LoggerMiddleware);
server.use(express.json()); // To parse request bodies into objects
server.use("/users", usersRouter); // Each request on http://localhost:3000/users is handled by usersRouter
server.use("/books", booksRouter);

console.log(listEndpoints(server));

mongoose
  .connect("mongodb://localhost:27017/strivebooks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    server.listen(port, () => {
      // Server run and listen to connections on port 3000
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch(err => console.log(err));
