import express from 'express';
import { unlike } from '../controllers/posts.mjs';
import { like } from '../controllers/posts.mjs';

import {
	getPosts,
	getPost,
	createPost,
	updatePost,
	likePost,
	deletePost,
	getPostByTag,
} from '../controllers/posts.mjs';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.get('/tag/:tags', getPostByTag);
router.put('/like/:id', like);
router.put('/unlike/:id', unlike);
export default router;
