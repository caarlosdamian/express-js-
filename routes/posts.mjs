import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/postController.mjs';
const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

// module.exports = router;
export default router;
