import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_TAG,
} from '../constants/actionTypes';

export default (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case FETCH_BY_TAG:
			return action.payload;

		case LIKE:
			console.log(action.payload.likeCount);
			console.log(action.payload._id);
			return posts.map((post) =>
				post._id === action.payload.id
					? { ...post, likeCount: action.payload.likeCount }
					: post
			);

		case CREATE:
			return [...posts, action.payload];
		case UPDATE:
			return posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		case DELETE:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};
