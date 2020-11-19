import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	tags: [String],
	selectedFile: String,
	likeCount: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
