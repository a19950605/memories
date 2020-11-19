import {
	AppBar,
	Button,
	Container,
	Grow,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import TemporaryDrawer from './TemporaryDrawer';
import memories from '../images/memories.png';
import useStyles from '../styles';
import Axios from 'axios';
import './my-info.css';
const MyInfo = () => {
	const info = useSelector((state) => state.userSignin);
	const history = useHistory();
	const classes = useStyles();
	const [passwd, setPasswd] = useState('');
	const [confirmPasswd, setConfirmPasswd] = useState('');
	const [pwSuccess, setPwSuccess] = useState(true);
	const [pwLenght, setPwLenght] = useState(true);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [passwordNull, setPasswordNull] = useState(false);
	if (!info.userInfo) {
		return <Redirect to="/permissionDenied" />;
	}
	//console.log(!info.userInfo);
	const submitAction = (e) => {
		e.preventDefault();
		if (passwd === '' || confirmPasswd === '') {
			setPasswordNull(true);
			return false;
		}
		if (pwLenght.length < 6) {
			setPwLenght(false);
			setSubmitSuccess(false);

			return false;
		}

		if (passwd !== confirmPasswd) {
			console.log('not same');
			setPwSuccess(false);
			setSubmitSuccess(false);
			return false;
		}

		setPwLenght(true);
		setPwSuccess(true);
		setPasswordNull(false);
		const email = info.userInfo.email;
		console.log(passwd, info.userInfo.email);
		Axios.put('http://localhost:5000/users/changePw', {
			email,
			password: passwd,
		})
			.then(console.log('success'))
			.catch(console.log('er'));
		console.log('correct');
		setPasswd('');
		setConfirmPasswd('');
		setSubmitSuccess(true);
	};
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
					<Paper>
						<form className="my-info-form" autoComplete="off" noValidate>
							<div>
								<div className="form-item">Email: {info.userInfo.email}</div>{' '}
								<div className="form-item">Name: {info.userInfo.name}</div>{' '}
								<div className="form-item changePw">change password</div>
								{submitSuccess ? (
									<div className="errorMsg">*change password success</div>
								) : (
									''
								)}
								{passwordNull ? (
									<div className="errorMsg">*password cant be null</div>
								) : (
									''
								)}
								{!pwLenght ? (
									<div className="errorMsg">
										*password length must be greater than six
									</div>
								) : pwSuccess ? (
									''
								) : (
									<div>password are not same</div>
								)}
								<div className="form-item">
									<TextField
										className="my-info-Textarea form-item"
										type="password"
										id="password"
										value={passwd}
										label="password"
										onChange={(e) => setPasswd(e.target.value)}
									/>
								</div>{' '}
								<div className="form-item">
									<TextField
										className="my-info-Textarea"
										type="password"
										id="confirmPw"
										label="ConfirmPassword"
										value={confirmPasswd}
										onChange={(e) => setConfirmPasswd(e.target.value)}
									/>
								</div>
								<div className="form-item">
									<Button
										className="button"
										onClick={submitAction}
										variant="contained"
										color="primary"
									>
										Change Password
									</Button>
								</div>
							</div>
						</form>
					</Paper>
				</Grow>
			</Container>
		</div>
	);
};

export default MyInfo;
