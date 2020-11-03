const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// functions to do tasks
const generateNoteId = () => uuidv4();

//doubles as the DB updater by overwriting
const writeToDatabase = (newNotes) => new Promise ((resolve, reject) => {
    const dbFile = path.join(process.cwd(),'db/db.json');
    fs.writeFile(dbFile, JSON.stringify(newNotes), "utf8", ()=>resolve());
});

const gettingNotes = () => new Promise ((resolve, reject) => {
    const dbFile = path.join(process.cwd(),'db/db.json');
    fs.readFile(dbFile, 'utf8', (err, data) => {
        if (err) throw err;
        const updatedNotes = [];
        let storedNotes = JSON.parse(data);
        storedNotes.forEach((note)=>{
            updatedNotes.push(note);
        });
        resolve(updatedNotes);
    });
}); 

// body from req.body
const saveNotes = async (body) => {
    const newNote = body;
    newNote.id = generateNoteId();
    const notes = await gettingNotes();
    await writeToDatabase([...notes, newNote]);
    return gettingNotes();
};

// id from req.params.id
const deleteNotes = async (id) => {
    const notes = await gettingNotes();
    const newNotes = notes.filter((note)=>note.id !== id);
    await writeToDatabase(newNotes);
    return gettingNotes();
};

// initialise notetaker with a getNote()
const init = () => {
    gettingNotes();
};

module.exports = { generateNoteId, writeToDatabase, gettingNotes, saveNotes, deleteNotes, init };