// dependencies
const express = require('express');
const { init } = require('./src/tools');
const path = require('path');
const apiRoutes = require("./src/routes/apiRoutes");
const htmlRoutes = require("./src/routes/htmlRoutes");


// express app 
const app = express();
const PORT = process.env.PORT || 7001;

// static path for css/js BUT NOT html files (in this case)
app.use(express.static(path.join(process.cwd(), 'public')));

// specify app set up & handle data parse
app.use(express.urlencoded({extended: true}));
app.use(express.json());

apiRoutes(app);
htmlRoutes(app);

// listener
app.listen(PORT, (req, res) => {
    console.log(`App listening on port ` + `:${PORT}`);
})

init();