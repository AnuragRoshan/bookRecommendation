const mongoose = require('mongoose');

// Define user schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
    },
    age: {
        type: String,
    },
    rating: {
        type: Number
    },
    published: {
        type: Date
    },
    details: {
        type: String
    },
    isbn: {
        type: String
    },
    like: {
        type: Array
    },
    comments: [
        {
            username: String,
            name: String,
            comment: String,
            date: { type: Date, default: Date.now }
        }
    ]
}
    ,
    { timestamps: true });

// Create User model
const Book = mongoose.model('book', bookSchema);

module.exports = Book;
