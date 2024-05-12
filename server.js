// const express = require('express');
// const path = require('path');
// const router = require('./routes/index');
import express from 'express';
import router from './routes/index.mjs';
// const posts = require('./routes/posts');

const app = express();
app.use(express.json());
app.use(router);

// setup static folder

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen('8000', () => {
  console.log('server is running on port 8000');
});
