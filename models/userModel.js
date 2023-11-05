const mongoose = require('mongoose');

// define schmea class
const Schema = mongoose.Schema;

// create a schema object
const userSchema = new Schema({
    userId: {type: String, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model("user", userSchema);
module.exports = User;