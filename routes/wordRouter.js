const router = require('express').Router();
const wordModel = require('../models/wordModel');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// GET and ADD word information from Dictionary's API
// ---------------------------------------------------------
/* router.route("/add").post((req, res) => {
    const wordId = req.body.wordId;

    console.log("Add word: " + wordId);
})
 */



// ---------------------------------------------------------
// UPDATE word information from Dictionary's API
// ---------------------------------------------------------



// ---------------------------------------------------------
// DELETE word information from Dictionary's API
// ---------------------------------------------------------