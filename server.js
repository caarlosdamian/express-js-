// const express = require('express');
// const path = require('path');
// const router = require('./routes/index');
import express from 'express';
import router from './routes/index.mjs';
import { logger } from './middleware/logger.mjs';
import { errorHandler } from './middleware/error.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
// const posts = require('./routes/posts');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'testando' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(router);
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
// app.use(errorHandler);

// setup static folder

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen('8000', () => {
  console.log('server is running on port 8000');
});
