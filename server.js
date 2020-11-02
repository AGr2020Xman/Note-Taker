// dependencies
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import fs from 'fs';
import path from 'path';


// express app 
const app = express();
const PORT = process.env.PORT || 7001;

// static path for css/js BUT NOT html files (in this case)
app.use(express.static(path.join(__dirname, 'public')));

// specify app set up & handle data parse
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// globals
let notes = [];

// routing
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/api/notes', (req, res) => res.json('./db/db.json'));

app.post('/api/notes', (req, res) => {
    res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
    return res.json(notes.filter((note) => {
        if (note.id === parseInt(req.params.id)) {
            notes.splice(note.id,1);
            fs.writeFile('./db/db.json');            
        }
        // not functional - working on it - needs more research
    }
    ))
});

app.listen(PORT, (req, res) => {
    console.log(`App listening on localhost` + `:${PORT}`);
})

// functions to do tasks
const getNotes = () => {};

const writeToDatabase = () => {
    fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(notes), "utf8");
};

const saveNote = () => {};

const deleteNote = () => {
    
};

const generateNoteId = () => uuidv4();