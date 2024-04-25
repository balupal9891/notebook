const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const Jwt_Secret = "baluisagoodboy$12";

// Route 1: Create a User using : POST "/api/auth/createuser/" No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Enter Strong Password').isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then return bad requests 
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }

    try {
        // Check whether the User with requesting email exist or not in database
        let user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            return res.status(400).json({success, error: "User with that email already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);
        // creating a user and their date in mongoDB
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, Jwt_Secret);
        success = true;
        res.json({success, authtoken });
        // res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }

    // .then(user => res.json(user)).catch(error => {console.log(error),
    // res.json({error: 'Enter valid Instances'})})
})


// Route 2: Authenticate a user using : POST "/api/auth/login/" No login required
router.post('/login', [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {

    // If there are errors then return bad requests 
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        // Searching email in database
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "please try to login with correct credential" });
        }
        // comparing searched email's password with user given password through request
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({success, error: "please try to login with correct credential" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // signing the data using jwt function 
        const authtoken = jwt.sign(data, Jwt_Secret);
        success = true;
        res.json({success, authtoken });

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }

})


// Route 3: Get logged in user detail using : POST "/api/auth/getuser/" No login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }

})



module.exports = router;