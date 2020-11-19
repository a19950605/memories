import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, signin } from '../actions/user';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register() {
	const classes = useStyles();
	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const userRegister = useSelector((state) => state.userRegister);

	const dispatch = useDispatch();
	const history = useHistory();
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;
	useEffect(() => {
		if (userInfo) {
			history.push('/');
		}
	}, [history, userInfo]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(
			register(registerData.name, registerData.email, registerData.password)
		);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{userRegister.error ? (
								<div style={{ color: 'red' }}>*{userRegister.error}</div>
							) : (
								''
							)}
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
								onChange={(e) =>
									setRegisterData({ ...registerData, name: e.target.value })
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e) =>
									setRegisterData({ ...registerData, email: e.target.value })
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) =>
									setRegisterData({ ...registerData, password: e.target.value })
								}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>{' '}
					<Grid container>
						{
							// <Grid item xs>
							// 	<Link href="#" variant="body2">
							// 		Forgot password?
							// 	</Link>
							// </Grid>
						}
						<Grid item xs>
							<Link href="/signin" variant="body2">
								{'Already have account?'}
							</Link>
						</Grid>
						<Grid item>
							<Link href="/" variant="body2">
								{'View memoires'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
