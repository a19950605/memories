import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, posts }) => {
	//	const posts = useSelector((state) => state.posts);

	const classes = useStyles();
	console.log(posts);
	//<CircularProgress />
	return !posts.length ? (
		<div>you dont have any post, please add some</div>
	) : (
		<Grid
			className={classes.container}
			container
			alignItems="stretch"
			spacing={3}
		>
			{posts.map((post) => (
				<Grid key={post._id} item xs={12} sm={6} md={6}>
					<Post post={post} setCurrentId={setCurrentId} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
