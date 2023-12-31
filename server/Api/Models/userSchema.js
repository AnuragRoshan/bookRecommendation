const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    selectedGenres: {
        type: [String],
        default: [],
    },
    likes: {
        type: Array
    },
    token: {
        type: String,
        default: null,
    },
}
    ,
    { timestamps: true });

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
