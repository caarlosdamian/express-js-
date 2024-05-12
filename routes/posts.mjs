import { Router } from 'express';
const router = Router();

let posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
];

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0)
    return res.status(200).json(posts.slice(0, limit));
  res.status(200).json(posts);
});

router.get('/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;

  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    const error = new Error(`A Post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.json([post]);
});

router.post('/', (req, res, next) => {
  const {
    body: { title },
  } = req;

  const newPost = { id: posts.length + 1, title };
  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
});

router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A Post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    const error = new Error(`A Post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);
  res.status(200).json(posts);
});

// module.exports = router;
export default router;
