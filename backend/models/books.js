const mongoose = require('mongoose');

const books = new mongoose.Schema(
  {
    name: { type: String },
    image_Url: { type: String },
    author: { type: String },
    pages: { type: String },
    price: { type: Number }

  },
  { collection: 'books', timestamps: true }
);

const model = mongoose.model('Books', books);

module.exports = model;