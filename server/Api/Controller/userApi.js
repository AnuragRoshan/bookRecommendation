const bcrypt = require('bcryptjs');
const User = require('../Models/userSchema');
const {
    checkUserExists,
    checkEmailValidity,
    checkAgeValidity,
} = require('../Middleware/userReg');

exports.registerUser = async (req, res, next) => {
    try {
        const { name, username, password, age, selectedGenres } = req.body;
        // console.log(req.body);
        // return;

        // await checkUserExists(req, res);
        // await checkEmailValidity(req, res);
        // await checkAgeValidity(req, res);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
