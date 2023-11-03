const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})