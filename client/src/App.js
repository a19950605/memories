import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';
import SignIn from './components/Signin';
import main from './components/main';
import Register from './components/Register';
import MyPost from './components/myPost';
import MyInfo from './components/my-info';
import NotFound from './components/notFound';
import PermissionDenied from './components/permissionDenied';

const App = () => {
	// const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const classes = useStyles();
	const userSignin = useSelector((state) => state.userSignin);

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [currentId, dispatch]);

	return (
		<Router>
			<Switch>
				<Route exact path="/signin" component={SignIn}></Route>
				<Route exact path="/register" component={Register}></Route>
				<Route exact path="/" component={main}></Route>
				<Route exact path="/my-post" component={MyPost}></Route>
				<Route exact path="/my-info" component={MyInfo}></Route>
				<Route exact path="/tag/:tag" component={main}></Route>
				<Route exact path="/permissionDenied" component={PermissionDenied}></Route>

				<Route path="*" component={NotFound}></Route>
			</Switch>
		</Router>
	);
};

export default App;
