/* eslint-disable no-unused-vars */
const express = require("express");
// eslint-disable-next-line no-unused-vars
const app = express();
const Books = require("../../models/books");
const Admin = require("../../models/admin");
const { createError } = require("../../createError/createError");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res, next) => {
    await Admin.findOne({ username: req.body.username })
      .then(async (data) => {
        if (!data) {
          next(createError(404, "User not found"));
        } else if (await bcrypt.compare(req.body.password, data.password)) {
          const admin = { name: req.body.username };

          const accessToken = generateAccessToken(admin);

          res.status(200).json({ accessToken });
        } else {
          next(createError(401, "Incorrect password"));
        }
      })
      .catch((error) => {
        console.log(error);
        next(createError());
      });
  },
  addBook: (req, res, next) => {
    Books.create(req.body)
      .then((response) => {
        return res.status(200).json("Book added succesfully");
      })
      .catch((error) => {
        console.log(error);
        return next(createError());
      });
  },
  deleteBook: (req, res, next) => {
    console.log(req.query.bookId);
    Books.findOneAndRemove({ _id: req.query.bookId })
      .then((response) => {
       
        if (response) {
          return res.status(200).json("Book deleted successfully");
        }

        next(createError(404, "Book not found"));
      })
      .catch((error) => {
        console.log(error);
        next(createError(404, "Book not found"));
      });
  },
  getBookDetails: (req, res) => {
    console.log(req.query);
  },
};

function generateAccessToken(user) {
  // eslint-disable-next-line no-undef
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}
