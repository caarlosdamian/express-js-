const express = require('express');
const path = require('path');

const app = express();

let posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
];

// setup static folder

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/posts/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) return res.json(posts.slice(0, limit));
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const {
    params: { id },
  } = req;

  const post = posts.find((post) => post.id === parseInt(id));
  res.json([post]);
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen('8000', () => {
  console.log('server is running on port 8000');
});
