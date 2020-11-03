const path = require('path');

module.exports = (app) => {

    // GET request
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'public/notes.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'public/index.html'));
    });
};
