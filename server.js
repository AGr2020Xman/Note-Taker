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

app.post('/api/notes', (req, res) => res.json(req.body));

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
const generateNoteId = () => uuidv4();

const writeToDatabase = () => new Promise ((resolve, reject) => {
    fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(notes), "utf8");
});

const getNotes = () => {
    const updateNotes = fs.readFileSync(`${__dirname}/db/db.json`, 'utf8', (err, data) => {
        if (err) throw err;
        const updatedNotes = [];
        let storedNotes = JSON.parse(data);
        storedNotes.forEach((note)=>{
            updatedNotes.push(note);
        });
        return updatedNotes;
    });
    notes = JSON.parse(updateNotes);
    return notes;
};

// body from req.body
const saveNote = async (body) => {
    const newNote = body;
    newNote.id = generateNoteId();
    notes.push(newNote);
    await writeToDatabase();
    return getNotes();
};

const deleteNote = (id) => {
    let x = notes.find((note)=>note.id == id)
    notes.splice(x,1)
};
