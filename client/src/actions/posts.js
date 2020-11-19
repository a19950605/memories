import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_TAG,
} from '../constants/actionTypes';

import * as api from '../api/index.js';
import Axios from 'axios';

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getPostsByTag = (tag) => async (dispatch) => {
	try {
		const { data } = await api.fetchPostsByTag(tag);

		dispatch({ type: FETCH_BY_TAG, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		console.log(data);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const likePost = (id, uid) => async (dispatch) => {
	try {
		//	const { data } = await api.likePost(id);
		const res = await Axios.put(`http://localhost:5000/posts/like/${id}`, {
			id: uid,
		});
		console.log(res.data.likeCount);
		console.log(id);
		dispatch({ type: LIKE, payload: { id, likeCount: res.data.likeCount } });
	} catch (error) {
		console.log(error.message);
	}
};
export const unlikePost = (id, uid) => async (dispatch) => {
	try {
		const res = await Axios.put(`http://localhost:5000/posts/unlike/${id}`, {
			id: uid,
		});

		dispatch({
			type: LIKE,
			payload: { id, likeCount: res.data.likeCount },
		});
	} catch (err) {
		console.log(err.message);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await await api.deletePost(id);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};
