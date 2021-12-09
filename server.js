const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notes);

  console.info(`${req.method} request received to get notes`);
});

app.get('/api/notes/:note_id', (req, res) => {
  if (req.body && req.params.note_id) {
    console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < note.length; i++) {
      const currentNote = note[i];
      if (currentNote.note_id === noteId) {
        res.json(currentNote);
        return;
      }
    }
    res.json('Note ID not found');
  }
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if ( title && text ) {
    const newNote = {
      title,
      text,
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
 
        parsedNotes.push(newNote);
    
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

app.get('/api/upvotes', (req, res) => {
  res.json(`${req.method} request received to retrieve upvote count`);
  console.info(`${req.method} request received to retrieve upvote count`);
});

app.post('/api/upvotes/:note_id', (req, res) => {
  if (req.body && req.params.review_id && req.body.upvote) {
    console.info(`${req.method} request received to upvote a note`);


    console.info(req.body);

    const noteId = req.params.note_id;
    const requestedUpvote = req.body.upvote;

    for (let i = 0; i < note.length; i++) {
      const currentNote = note[i];
      if (currentNote.note_id === noteId && requestedUpvote) {
        currentNote.upvotes += 1;
        res.json(`New upvote count is: ${currentNote.upvotes}`);
        return;
      }
    }
    res.json('Note ID not found');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
