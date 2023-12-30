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
        const allBooks = await Book.find();
        let count = 0;

        const updatePromises = allBooks.map(async (book) => {
            // Check if book.isbn is defined and its length is not 10 or 13
            if (book.isbn && !(book.isbn.length === 10 || book.isbn.length === 13)) {
                count++;
                // Delete the document
                await Book.deleteOne({ _id: book._id });
            }
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
    console.log(minAge, maxAge);

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
