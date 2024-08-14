
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const response = await user.save();

        res.status(200).json({
            success: true,
            data: response,
            message: "User registered successfully"
        });
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(500).json({
            success: false,
            data: null,
            message: "Server error"
        });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
             
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            return res.cookie('token', token, options).status(200).json({
                success: true,
                message: "Login successfully",
                user,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.log(`Not able to login ${error}`);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
