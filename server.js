const { randomUUID } = require('crypto');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3001;
//const saveNote = save-note;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('develop-public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/db/:note_id', (req, res) => {
  if (req.body && req.params.note_id) {
    console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < note.length; i++) {
      const currentNote = note [i];
      if (currentNote.note_id === noteId) {
        res.json(currentNote);
        return;
      }
    }
    res.json('Note ID not found');
  };
});

app.post('/api/note', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { text, title} = req.body;

  if (text && title) {
    const newNote = {
      text, 
      title, 
      note_id: randomUUID()
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedReviews.push(newNote);

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
  }else{
    res.json('Error in posting note');
  }
});

app.post('/api/db/:note_id', (req, res) => {
  if (req.body && req.params.note_id && req.body.upvote) {
    console.info(`${req.method} request received to upvote a review`);

    // Log the request body
    console.info(req.body);

    const noteId = req.params.note_id;
    const requestedUpvote = req.body.upvote;

    for (let i = 0; i < reviews.length; i++) {
      const currentNote = note[i];
      // console.log(currentReview.review_id, reviewId);
      if (currentNote.note_id === noteId && requestedUpvote) {
        currentNote.upvotes += 1;
        res.json(`New upvote count is: ${currentNote.upvotes}`);
        return;
      }
    }
    res.json('Note ID not found');
  }
});

app.listen(3001, () => 
    console.log(`API server now on port 3001!`)
);
