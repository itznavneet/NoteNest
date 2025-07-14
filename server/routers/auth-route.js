const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

router.get('/', async (req, res) => {
    try {
        res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
        console.log(error)
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "User already exists or invalid data" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ error: "Invalid credentials" });

         // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;