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

router.get('/:id', (req, res) => {
  const {
    params: { id },
  } = req;

  const post = posts.find((post) => post.id === parseInt(id));
  if (!post)
    return res
      .status(404)
      .json({ msg: `A Post with id of ${id} was not found` });
  res.json([post]);
});
router.post('/', (req, res) => {
  const { body } = req;

  console.log(body);

  res.status(201).json('Success');
});

// module.exports = router;
export default router;
