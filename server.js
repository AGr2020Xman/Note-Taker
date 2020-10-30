// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// express app 
const app = express();
const PORT = process.env.PORT || 7001;

// static path for css/js BUT NOT html files (in this case)
app.use(express.static(path.join(__dirname, 'public')));

// specify app set up & handle data parse
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routing

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/api/notes', (req, res) => {
    
});

app.post('/api/notes', (req, res) => {

});


