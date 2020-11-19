import React from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PageviewIcon from '@material-ui/icons/Pageview';
import { likePost, deletePost, unlikePost } from '../../../actions/posts';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const userSignin = useSelector((state) => state.userSignin);
	// console.log(post.creator.name);
	//fetch creatorid

	console.log(post);
	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={
					post.selectedFile ||
					'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
				}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant="h6">{post.creator.name || ''}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				{userSignin.userInfo && post.creator._id === userSignin.userInfo._id ? (
					<Button
						style={{ color: 'white' }}
						size="small"
						onClick={() => setCurrentId(post._id)}
					>
						<MoreHorizIcon fontSize="default" />
					</Button>
				) : (
					''
				)}
			</div>
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary" component="h2">
					{post.tags.map((tag) => (
						<Link
							to={`/tag/${tag}`}
							style={{ textDecoration: 'none', color: 'gray' }}
						>
							{`#${tag} `}{' '}
						</Link>
					))}
				</Typography>
			</div>
			<Typography
				className={classes.title}
				gutterBottom
				variant="h5"
				component="h2"
			>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				{userSignin.userInfo &&
				!post.likeCount.filter((l) => l.user === userSignin.userInfo._id).length ? (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(likePost(post._id, userSignin.userInfo._id))}
					>
						<ThumbUpAltOutlinedIcon fontSize="small" /> Like {post.likeCount.length}
					</Button>
				) : (
					''
				)}
				{userSignin.userInfo &&
				post.likeCount.filter((l) => l.user === userSignin.userInfo._id).length ? (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(unlikePost(post._id, userSignin.userInfo._id))}
					>
						<ThumbUpAltIcon fontSize="small" />
						Like {'            '}
						{post.likeCount.length}
					</Button>
				) : (
					''
				)}{' '}
				{!userSignin.userInfo ? (
					<Button size="small" color="disabled">
						<ThumbUpAltIcon fontSize="small" />
						Like {'            '}
						{post.likeCount.length}
					</Button>
				) : (
					''
				)}{' '}
				{(userSignin.userInfo && post.creator._id == userSignin.userInfo._id) ||
				post.creator.name === '' ? (
					<Button
						size="small"
						color="primary"
						onClick={() => dispatch(deletePost(post._id))}
					>
						<DeleteIcon fontSize="small" /> Delete
					</Button>
				) : (
					''
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
