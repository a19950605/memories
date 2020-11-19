import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateToken } from '../util.mjs';
import User from '../models/User.mjs';

const router = express.Router();

export const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.send({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user),
			});
			return;
		}
	}
	res.status(401).send({ message: 'Invalid email or password' });
};

export const register = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			res.status(404).json({ message: 'email already exist' });
		}
		const salt = await bcrypt.genSalt(10);

		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, salt),
		});
		const createdUser = await newUser.save();
		console.log('debug');

		res
			.json({
				_id: createdUser._id,
				name: createdUser.name,
				email: createdUser.email,

				token: generateToken(createdUser),
			})
			.status(200);
	} catch (err) {
		res.status(400).json({ message: err.message, error: err.message });
	}
};
export const changePw = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		const { _id, name, email } = user;

		const salt = await bcrypt.genSalt(10);
		const password = bcrypt.hashSync(req.body.password, salt);

		const updatedUser = { name, email, password };
		await User.findByIdAndUpdate(_id, updatedUser, { new: true });
		console.log('fine');
		res.json({ success: true }).status(200);
	} catch (err) {
		res.status(400).json({ message: err.message, error: err.message });
	}
};
// export const updatePost = async (req, res) => {
// 	const { id } = req.params;
// 	const { title, message, creator, selectedFile, tags } = req.body;

// 	if (!mongoose.Types.ObjectId.isValid(id))
// 		return res.status(404).send(`No post with id: ${id}`);

// 	const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

// 	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

// 	res.json(updatedPost);
// };
export default router;
