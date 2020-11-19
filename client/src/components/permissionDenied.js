import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from '../images/memories.png';
import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsByTag } from '../actions/posts';
import TemporaryDrawer from './TemporaryDrawer';
import { Link } from 'react-router-dom';
import './permissionDenied.css';
const PermissionDenied = (props) => {
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
							<div className="denied">You are not allow to access</div>

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

export default PermissionDenied;
