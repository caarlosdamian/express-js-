import { Router } from 'express';
import postRouter from './posts.mjs';

const router = Router();

router.use('/api/posts', postRouter);

export default router;
