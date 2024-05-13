let posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
];

// @desc Get all posts
// @route GET /api/posts/:id

const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0)
    return res.status(200).json(posts.slice(0, limit));
  res.status(200).json(posts);
};
// @desc Get single post
// @route GET /api/posts/:id

const getPost = (req, res, next) => {
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
};

// @desc Get single post
// @route  PUT /api.posts/:id
const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A Post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc Create single post
// @route  POST /api.posts/

const createPost = (req, res, next) => {
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
};

const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    const error = new Error(`A Post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);
  res.status(200).json(posts);
};

export { getPosts, getPost, createPost, deletePost, updatePost };
