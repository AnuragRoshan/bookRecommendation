const bcrypt = require('bcryptjs');
const User = require('../Models/userSchema');
const Book = require('../Models/bookSchema');
const Rating = require('../Models/ratingSchema');
const jwt = require('jsonwebtoken');
const casual = require('casual');
const request = require("request")

// const {
//     checkUserExists,
//     checkEmailValidity,
//     checkAgeValidity,
// } = require('../Middleware/userReg');

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passCheck = await bcrypt.compare(password, user.password)

        if (user && passCheck) {
            const token = jwt.sign(
                { id: user.id, username: user.username, name: user.name, age: user.age },
                "jwtsecret",
                { expiresIn: "1h" },
            )
            user.token = token;
            user.password = undefined;

            //cookie section
            const options = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
                ),
                httpOnly: true,
            };
            res.status(200).cookie("jwt", token, options).json({ msg: 'User Logged In Successfully', token, user });
        } else {
            res.status(201).json({ msg: "Invalid Creds" })
        }

    } catch (error) {
        console.log(error);
    }
};


exports.getUser = async (req, res, next) => {
    // console.log(req.user);
    let user
    if (req.user) {
        // console.log(req.user);
        user = await User.findOne({ username: req.user.username });
    }
    res.send(user);

};

exports.logout = async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({ msg: "User Logged Out" });
};




exports.updateDb = async (req, res, next) => {
    try {
        const books = await Book.find({}, 'isbn');

        // return res.status(200).json(books)
        await Rating.deleteMany({});

        const dummyData = [];

        for (let i = 0; i < 3000; i++) {
            const username = (casual.username + "@gmail.com").toLowerCase();

            const isbn = books[Math.floor(Math.random() * books.length)].isbn;
            const rating = (Math.floor(Math.random() * 5) + 1) + (Math.floor(Math.random() * 10) + 1) * 0.1;
            // console.log(isbn);
            dummyData.push({
                username,
                isbn,
                rating,
            });
        }

        for (let i = 0; i < 577; i++) {
            const username = (casual.username + "@gmail.com").toLowerCase();

            const isbn = books[i].isbn;
            const rating = (Math.floor(Math.random() * 5) + 1) + (Math.floor(Math.random() * 10) + 1) * 0.1;
            // console.log(isbn);
            dummyData.push({
                username,
                isbn,
                rating,
            });
        }

        // Insert dummy data into the Rating collection
        await Rating.insertMany(dummyData);
        return res.status(200).json({ msg: 'Database updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error While updating' });
    }
};



exports.registerUser = async (req, res, next) => {
    try {
        const { name, username, password, age, selectedGenres } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        let usernameC = await User.findOne({ username: username })
        if (!usernameC) {
            const user = await User.create({
                name: name,
                username: username, // Assuming username is used as an email
                age: age,
                password: hashedPassword,
                selectedGenres: selectedGenres || [], // Default to an empty array if not provided
            });

            const token = jwt.sign(
                { id: user.id, user },
                "jwtsecret",
                { expiresIn: "1h" },

            )
            // Save the new user to the database
            user.token = token;
            user.password = undefined;



            return res.status(200).json({ msg: 'User Added Successfully', user });
        }
        else {
            return res.status(202).json({ msg: " User Already Exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};


exports.getBooksByAge = async (req, res, next) => {
    const minAge = req.params.minAge;
    const maxAge = req.params.maxAge;
    // console.log(minAge, maxAge);

    try {
        // Your logic to fetch books within the specified age range
        const books = await Book.find().then(books => {
            return books.filter(book => {
                const [minBookAge, maxBookAge] = book.age.split(' ').map(Number);
                return minBookAge <= maxAge && maxBookAge >= minAge;
            });
        });

        // Respond with the fetched books
        res.json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getBook = async (req, res, next) => {
    const id = req.params.id; // Assuming the book ID is provided as a URL parameter
    console.log(id);

    try {
        const book = await Book.findOne({ name: id });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ book: book });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Error retrieving book' });
    }
};


exports.toggleBookmark = async (req, res, next) => {
    const { bookId, username } = req.body;

    try {
        const book = await Book.findOne({ _id: bookId });
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if 'like' property is undefined, and initialize it as an empty array if needed
        if (!book.like) {
            book.like = [];
        }

        if (!user.likes) {
            user.likes = [];
        }

        const userIndex = book.like.indexOf(username);
        const bookIndex = user.likes.indexOf(bookId);

        if (userIndex === -1) {
            // User not found, add to 'like'
            book.like.push(username);
        } else {
            // User found, remove from 'like'
            book.like.splice(userIndex, 1);
        }

        if (bookIndex === -1) {
            // Book not found, add to 'likes'
            user.likes.push(bookId);
        }
        else {
            // Book found, remove from 'likes'
            user.likes.splice(bookIndex, 1);
        }

        // Save the changes to the book in the database
        await book.save();
        await user.save();

        res.json({ success: true, userIndex: userIndex });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getLikedBook = async (req, res, next) => {
    // const { username } = req.body;
    // const username = 'test2@gmail.com';
    const username = req.params.id;
    console.log(username);
    try {
        // Find the user based on the email
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract the liked book IDs from the user's likes array
        const likedBookIds = user.likes;

        // Use the liked book IDs to fetch the corresponding books from the Book model
        const likedBooks = await Book.find({ _id: { $in: likedBookIds } });

        res.status(200).json({ likedBooks });
    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
    // res.status(200).json({ likedBooks: "likedBooks" });


}

exports.postComment = async (req, res, next) => {
    const { bookName, username, comment, name } = req.body;

    // Validate input
    if (!bookName || !username || !comment) {
        return res.status(400).json({ error: 'Invalid input. Please provide bookName, username, and comment.' });
    }

    try {
        // Use findOneAndUpdate to find by name and update comments
        const updatedBook = await Book.findOneAndUpdate(
            { name: bookName },
            {
                $push: {
                    comments: {
                        username,
                        comment,
                        name,
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

};


exports.getComment = async (req, res, next) => {
    const { bookId } = req.params;
    // console.log(bookId);

    try {
        const bookWithComments = await Book.findOne({ name: bookId })

        if (!bookWithComments) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Extract the comments array with user details
        // const commentsWithUserDetails = bookWithComments.comments.map(comment => ({
        //     _id: comment._id,
        //     username: comment.username.name, // Assuming 'name' is a field in the User model
        //     comment: comment.comment,
        //     date: comment.date,
        // }));
        return res.json(bookWithComments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getRecom = async (req, res, next) => {
    const { book } = req.params;
    request(`http://127.0.0.1:5000/get_recommendations?book_name=` + book, function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        res.send(body); //Display the response on the website
    });
    // res.send(book);
};

exports.getRecom2 = async (req, res, next) => {
    const { book } = req.params;
    request(`http://127.0.0.1:5000/get_collab_recommendations?book_name=` + book, function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        res.send(body); //Display the response on the website
    });
    // log(book)
    // res.send(typeof book);
};

exports.getSearch = async (req, res, next) => {
    const { bookName } = req.params;

    try {
        const books = await Book.find({
            $or: [
                { name: { $regex: bookName, $options: 'i' } }, // Search by book name
                { author: { $regex: bookName, $options: 'i' } } // Search by author name
            ]
        });

        if (!books) {
            return res.status(404).json({ error: 'Books not found' });
        }

        return res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getBooks = async (req, res, next) => {
    const { arr } = req.body;
    try {
        // Use the find method to retrieve books with ISBNs matching the array indices
        const books = await Book.find({ isbn: { $in: arr } });

        if (books.length === 0) {
            return res.status(404).json({ error: 'No books found for the provided ISBNs.' });
        }

        // Return the array of books in the response
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.setRating = async (req, res, next) => {
    const { bookIsbn, username, rating } = req.body;
    console.log(bookIsbn, username, rating);

    try {
        // Find the book with the given ISBN
        const book = await Book.findOne({ isbn: bookIsbn })
        // return res.status(200).json(book);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const existingRatingIndex = await book.ratings.findIndex((r) => r.username === username);

        // Update or add a new rating entry
        existingRatingIndex !== -1
            ? (book.ratings[existingRatingIndex].rate = rating)
            : book.ratings.unshift({ username, rate: rating });

        // Save the updated book
        await book.save();



        res.json({ message: 'Rating updated successfully' });
    } catch (error) {
        console.error('Error setting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}