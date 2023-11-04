const mongoose = require('mongoose');

// define schema class
const Schema = mongoose.Schema;

// create a schema object
const wordSchema = new Schema({
    user: {type: String, required: true},
    wordId: {type: String, required: true},
    audio: {type: String, required: true}
});

const Word = mongoose.model("word", wordSchema);
module.exports = Word;
