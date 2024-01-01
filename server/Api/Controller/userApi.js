const bcrypt = require('bcryptjs');
const User = require('../Models/userSchema');
const Book = require('../Models/bookSchema');
const passport = require('passport');
// const {
//     checkUserExists,
//     checkEmailValidity,
//     checkAgeValidity,
// } = require('../Middleware/userReg');


exports.updateDb = async (req, res, next) => {
    try {
        const allUser = await Book.find();
        let count = 0;

        const updatePromises = allUser.map(async (book, index) => {
            await book.save();
        });

        await Promise.all(updatePromises);

        return res.status(200).json({ count: count });
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
            const newUser = new User({
                name: name,
                username: username, // Assuming username is used as an email
                age: age,
                password: hashedPassword,
                selectedGenres: selectedGenres || [], // Default to an empty array if not provided
            });

            // Save the new user to the database
            await newUser.save();

            return res.status(200).json({ msg: 'User Added Successfully' });
        }
        else {
            return res.status(202).json({ msg: " User Already Exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};


exports.loginUser = (req, res, next) => {
    // console.log(req.body);
    passport.authenticate("local", (err, user) => {
        // console.log(err);
        if (err) { console.log(err); res.send({ status: "500", message: "Try Again Later" }); }
        else if (!user) return res.send({ status: "202", message: "wrong cred" });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                // console.log(req.user);
                res.send({ status: "200", message: "Autheticated " });
                console.log(req.user);
            });
        }
    })(req, res, next);
};

exports.userDetails = (req, res) => {
    // res.send(req); // The req.user stores the entire user that has been authenticated inside of it.
    console.log(req.user);
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
        const book = await Book.findOne({ _id: id });

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
    const usermail = "rahul123@gmail.com"
    try {
        // Find the user based on the email
        const user = await User.findOne({ username: usermail });

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
    const { bookId, username, comment } = req.body;

    // Validate input
    if (!bookId || !username || !comment) {
        return res.status(400).json({ error: 'Invalid input. Please provide bookId, username, and comment.' });
    }

    try {
        // Use findByIdAndUpdate for atomic update
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                $push: {
                    comments: {
                        username,
                        comment,
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
        const bookWithComments = await Book.findOne({ _id: bookId })

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