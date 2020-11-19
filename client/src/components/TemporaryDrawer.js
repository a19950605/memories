import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/user';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

export default function TemporaryDrawer() {
	const classes = useStyles();
	const userSignin = useSelector((state) => state.userSignin);
	const dispatch = useDispatch();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const conv = {
		Login: 'signin',
		Register: 'register',
		'View Post': '/',
		'Search post': 'search',
		'View my post': 'my-post',
		'Create post': 'create',
		Logout: 'signout',
		'My Info': 'my-info',
	};
	console.log(conv);

	const logout = () => {
		dispatch(signout());
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			{!localStorage.getItem('userInfo') ? (
				<List>
					{['Login', 'Register', 'View Post'].map((text, index) => (
						<Link style={{ textDecoration: 'none', color: 'black' }} to={conv[text]}>
							{' '}
							<ListItem button key={text}>
								<ListItemIcon>
									{' '}
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						</Link>
					))}
				</List>
			) : (
				<List>
					{['View Post', 'View my post', 'My Info'].map((text, index) => (
						<Link
							className="link"
							style={{ textDecoration: 'none', color: 'black' }}
							to={conv[text]}
						>
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>{' '}
						</Link>
					))}
					<ListItem button key="sign out">
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary={
								<Link
									className="link"
									style={{ textDecoration: 'none', color: 'black' }}
									to="/"
									onClick={logout}
								>
									Sign out
								</Link>
							}
						/>
					</ListItem>
				</List>
			)}
		</div>
	);

	return (
		<div>
			{['left'].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>
						<MenuIcon size="large" />
					</Button>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
