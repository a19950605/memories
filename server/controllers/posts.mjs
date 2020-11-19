import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.mjs';

const router = express.Router();

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find().populate('creator');

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id).populate('creator');

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const { title, message, selectedFile, creator, tags } = req.body;

	const newPostMessage = new PostMessage({
		title,
		message,
		creator,
		selectedFile,
		tags,
	});

	try {
		await newPostMessage
			.save()
			.then((newPostMessage) => newPostMessage.populate('creator').execPopulate());

		res.status(201).json(newPostMessage);
	} catch (error) {
		console.log(error.message);
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { title, message, creator, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const post = await PostMessage.findById(id);

	const updatedPost = await PostMessage.findByIdAndUpdate(
		id,
		{ likeCount: post.likeCount + 1 },
		{ new: true }
	);

	res.json(updatedPost);
};

export const getPostByTag = async (req, res) => {
	const tag = req.params.tags;

	console.log(req.params.tags);
	console.log(typeof tag);
	try {
		const post = await PostMessage.find({ tags: tag }).populate('creator');

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const like = async (req, res) => {
	try {
		console.log(req.body);
		const post = await PostMessage.findById(req.params.id);
		// Check if the post has already been liked
		if (
			post.likeCount.filter((like) => like.user.toString() === req.body.id)
				.length > 0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		post.likeCount.unshift({ user: req.body.id });

		await post.save();

		res.json(post).json(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export const unlike = async (req, res) => {
	try {
		const post = await PostMessage.findById(req.params.id);

		// Check if the post has already been liked
		if (
			post.likeCount.filter((like) => like.user.toString() === req.body.id)
				.length === 0
		) {
			return res.status(400).json({ msg: 'Post has not yet been liked' });
		}

		// Get remove index
		const removeIndex = post.likeCount
			.map((like) => like.user.toString())
			.indexOf(req.body.id);

		post.likeCount.splice(removeIndex, 1);

		await post.save();

		res.json(post).status(200);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};
export default router;
