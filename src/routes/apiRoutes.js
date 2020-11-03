const { gettingNotes, saveNotes, deleteNotes } = require('../tools');

module.exports = (app) => {

    // GET request
    app.get('/api/notes', async (req, res) => {
        const retrieved = await gettingNotes();
        res.json(retrieved);
    });
    
    // POST request
    app.post('/api/notes', (req, res) => res.json(saveNotes(req.body)));
    
    // DELETE request
    app.delete('/api/notes/:id', (req, res) => {
        return res.json(deleteNotes(req.params.id))
    });

};