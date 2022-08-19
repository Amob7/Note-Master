// requirements
const express = require('express');
const path = require('path');
// random id generater 
const uuid = require('./uuid.js');
// retrieving specific functions
const { readsFile, writesFile, both} = require('./fileGenerater.js')

// default port for local
const PORT = process.env.PORT || 3001;

// declaring express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readsFile('./db/db.json').then( (data) => res.json(JSON.parse(data)))

    console.log('Notes recieved');
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received for your notes`);
  
    const { title, body } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        body,
        id: uuid(),
      };
  
      both(newNote, './db/db.json');
      res.json(`note added`);
    } else {
      res.error('Error');
    }
  });

// where to implement port via PORT and declaring server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
