const router = require("express").Router();
const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');


// ---------------------------------------------------------
// add user
// ---------------------------------------------------------
router.route('/add').post(async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    const hashPassword = bcryptjs.hashSync(password, 10);

    console.log("Add: " + userId +"; Password: " + password);

    
    
    try {
        // check if a user with the given userId already exists
        const existingUser = await userModel.findOne({userId: userId});

        if (existingUser) {
            return res.status(400).json({error: 'User exists'});
        }

        // create a new user object
        const newUser = new userModel({
            userId,
            password: hashPassword
        });

        // save the new user object
        const savedUser = await newUser.save();
        res.status(200).json({message: 'Account created'});
    } catch {
        console.error('Error: ', error);
        res.status(400).json({error: 'Error creating user'})
    }    
});




// ---------------------------------------------------------
// List all users
// ---------------------------------------------------------



module.exports = router;