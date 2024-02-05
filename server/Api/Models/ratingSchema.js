const mongoose = require('mongoose');

// Define user schema
const ratingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    isbn: {
        type: Number,
        // required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

}
    ,
    { timestamps: true });

// Create User model
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
