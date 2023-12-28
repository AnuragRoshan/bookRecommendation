const userSchema = require('../Models/userSchema');

// Middleware to check if user already exists
exports.checkUserExists = async (req, res, next) => {
    try {
        const { username } = req.body;

        const existingUser = await userSchema.findOne({ email: username });

        if (existingUser) {
            return res.status(202).json({ msg: 'User already exists' });
        }

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Middleware to check if email is valid
exports.checkEmailValidity = (req, res, next) => {
    const { username } = req.body;
    // You can add more sophisticated email validation logic here
    // For simplicity, this example checks if it looks like an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
        return res.status(202).json({ msg: 'Invalid email address' });
    }

    next();
};

// Middleware to check if age is between 2-20
exports.checkAgeValidity = (req, res, next) => {
    const { age } = req.body;
    const ageNumber = parseInt(age);

    if (isNaN(ageNumber) || ageNumber < 2 || ageNumber > 20) {
        return res.status(202).json({ msg: 'Age must be between 2 and 20' });
    }

    next();
};
