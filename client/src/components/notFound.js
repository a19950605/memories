import React, { useState, useEffect } from 'react';
import {
	Container,
	AppBar,
	Typography,
	Grow,
	Grid,
	Paper,
} from '@material-ui/core';

import memories from '../images/memories.png';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsByTag } from '../actions/posts';
import TemporaryDrawer from './TemporaryDrawer';
import { Link } from 'react-router-dom';
import './notFound.css';
const NotFound = (props) => {
	const classes = useStyles();

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
						<Grid>
							<div className="notFound">Error, This link cannot be accessed</div>

							<Link to="/" className="home">
								Back to home
							</Link>
						</Grid>
					</Container>
				</Grow>
			</Container>
		</div>
	);
};

export default NotFound;
