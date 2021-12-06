const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('develop-public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './develop/public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});

app.get('api/notes', (req, res) => {
  res.json('${req.method} request received to get note');
  console.info('${req.method} request received to get note');
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
});


  const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });