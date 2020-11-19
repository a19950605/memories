import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './Posts/Posts';
import Form from './Form/Form';
import memories from '../images/memories.png';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsByTag } from '../actions/posts';
import TemporaryDrawer from './TemporaryDrawer';
import { Link } from 'react-router-dom';
import './main.css';
const Main = (props) => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const classes = useStyles();
	console.log(props);
	const posts = useSelector((state) => state.posts);
	const userSignin = useSelector((state) => state.userSignin);

	useEffect(() => {
		props.match.params.tag
			? dispatch(getPostsByTag(props.match.params.tag))
			: dispatch(getPosts());
	}, [currentId, dispatch, props.match.params.tag]);
	//console.log(posts);

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
									>{`hello ${userSignin.userInfo.name}`}</div>
								)}
								{props.match.params.tag ? (
									<span className="tag">
										current tag is {props.match.params.tag} remove
									</span>
								) : (
									''
								)}
								{props.match.params.tag ? (
									<Link className="link" to="/">
										Remove
									</Link>
								) : (
									''
								)}
							</Grid>
							<Grid item xs={12} sm={7}>
								<Posts setCurrentId={setCurrentId} posts={posts} />
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

export default Main;
