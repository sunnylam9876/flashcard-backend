const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const wordModel = require('./models/wordModel');

const url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
const key = '?key=fbc92ada-4089-44e4-bba9-c9f6ae2f96b9';

// connet to my MongoDB
//const mongoURI_english = process.env.mongoURI_english
const mongoURI_english = 'mongodb+srv://twoods9876:LDwdKVW7suXOXXp5@cluster0.nqmpo3r.mongodb.net/flashcard';
mongoose.connect(mongoURI_english);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

// import routes
const userRouter = require('./routes/userRouter');

// adding routes
app.use('/user', userRouter);




//----------------------------------------------------------------------------------
// add a word to db
//----------------------------------------------------------------------------------
app.post('/add', async(req, res) => {
    const wordId = req.body.wordId;
    const user = req.body.user;
    //display the word in console
    //console.log("Add word: " + wordId);

    // get the auiod string from dictionary's API
    axios.get(url + wordId + key)
        .then((response) => {
            // check if the response data is an array and not empty
            if(Array.isArray(response.data) && response.data.length > 0) {
                // extract the 'audio' field from the first item in the array

                try{
                    const audioField = response.data[0].hwi.prs[0].sound.audio;
                    // pass the 'audio' field to a state variable named "audio"
                    const audio = audioField;

                    //console.log(`Audio: ${audio}`);
                    // create a new db object
                    const wordObj = new wordModel({
                        user,
                        wordId,
                        audio
                    });

                    console.log("User: " + user + "; Word: " + wordId + "; Audio: " + audio);

                    // save the new object
                    wordObj
                        .save()
                        .then(() => res.json(audio))
                        .catch((err) => res.status(400).json('Error: ' + err));
                    
                } catch {
                    console.error("No such word");
                    // Handle the case where the 'audio' field is missing as needed
                    // For example, you can send a response indicating that audio data is missing
                    res.status(404).json('NIL');
                }                    
            } else {
                console.error("No response from API");
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
});

//----------------------------------------------------------------------------------
// Get word by user name
//----------------------------------------------------------------------------------
app.get('/getwordbyuser/:user', (req, res) => {
    //display the user in console
    console.log("Get word by user: " + req.params.user);
    const user = req.params.user;

    //find all the records that belong to the user
    wordModel.find({user: user})
        .then((wordObj) => res.json(wordObj))
        .catch((err) => res.status(400).json('Error: ' + err));
});

//----------------------------------------------------------------------------------
// Delete word by object ID
//----------------------------------------------------------------------------------
app.delete("/delete", async (req, res) => {
    const id = req.body.id;
    //const objectId = mongoose.Types.ObjectId(id);

    console.log("Delete: " + id);

    await wordModel.findByIdAndDelete(id)
        .then(() => res.json('Deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
