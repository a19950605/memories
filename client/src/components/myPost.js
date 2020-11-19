import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './Posts/Posts';
import Form from './Form/Form';
import memories from '../images/memories.png';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsByTag } from '../actions/posts';
import TemporaryDrawer from './TemporaryDrawer';
import { Link, Redirect } from 'react-router-dom';

const MyPost = (props) => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const classes = useStyles();
	console.log(props);
	const posts = useSelector((state) => state.posts);
	const userSignin = useSelector((state) => state.userSignin);
	let posts2;
	console.log(userSignin.userInfo);
	if (userSignin.userInfo)
		posts2 = posts.filter((p) => p.creator._id === userSignin.userInfo._id);

	console.log(posts2);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);
	//console.log(posts);
	if (!userSignin.userInfo) {
		return <Redirect to="/permissionDenied" />;
	}
	return (
		<div>
			<Container maxWidth="lg">
				<AppBar className={classes.appBar} position="static" color="inherit">
					<Typography className={classes.heading} variant="h2" align="center">
						Memories{' '}
					</Typography>
					<img className={classes.image} src={memories} alt="icon" height="60" />
					<TemporaryDrawer />
				</AppBar>
				<Grow in>
					<Container>
						<Grid container justify="space-between" alignItems="stretch" spacing={3}>
							<Grid item xs={12} sm={7}>
								{userSignin.userInfo && (
									<div
										style={{
											color: 'white',
											fontFamily: 'Roboto',
											fontSize: '1.5rem',
											fontWeight: 'bold',
										}}
									>
										hello {userSignin.userInfo.name}
									</div>
								)}
							</Grid>
							<Grid item xs={12} sm={7}>
								<Posts setCurrentId={setCurrentId} posts={posts2} />
							</Grid>
							<Grid item xs={12} sm={4}>
								<Form currentId={currentId} setCurrentId={setCurrentId} />
							</Grid>
						</Grid>
					</Container>
				</Grow>
			</Container>
		</div>
	);
};

export default MyPost;
