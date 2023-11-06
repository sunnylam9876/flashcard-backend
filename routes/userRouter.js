const router = require("express").Router();
const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');


// ---------------------------------------------------------
// add user (create account)
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
// check login name and password
// ---------------------------------------------------------
router.route('/login').post(async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;

    console.log("Login name: " + userId + "; Password: " + password);

    //check
    try {
        // check if a user with the given userId already exists
        const existingUser = await userModel.findOne({userId: userId});

        if (existingUser) {
            const authenticated = bcryptjs.compareSync(password, existingUser.password);
            if (authenticated) {
                return res.status(200).json({message: "Login ok"});
            } else {
                return res.status(400).json({error: 'Password error'});
            }
        } else {
            return res.status(400).json({error: 'User not found'});
        }    
    } catch {
        console.error('Error: ', error);        
    } 
});




module.exports = router;