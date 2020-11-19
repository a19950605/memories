import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { Link } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
	const userSignin = useSelector((state) => state.userSignin);

	const [postData, setPostData] = useState({
		creator: userSignin.userInfo ? userSignin.userInfo._id : '',
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	useEffect(() => {
		if (userSignin.userInfo) {
			setPostData({ ...postData, creator: userSignin.userInfo._id });
		}
	}, []);

	const post = useSelector((state) =>
		currentId ? state.posts.find((message) => message._id === currentId) : null
	);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		if (post) setPostData({ ...postData, post });
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		setPostData({
			...postData,
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		});
	};
	const [titleEmpty, setTitleEmpty] = useState(false);
	const [messageEmpty, setMessageEmpty] = useState(false);
	const [tagsEmpty, setTagsEmpty] = useState(false);
	const [selectedFileEmpty, setSelectedFileEmpty] = useState(false);
	const [formVal, setFormVal] = useState(true);
	const handleSubmit = async (e) => {
		e.preventDefault();

		//chech empty field
		if (!postData.title) {
			console.log('err');
			setTitleEmpty(true);
		} else {
			setTitleEmpty(false);
		}
		if (!postData.message) {
			setMessageEmpty(true);
		} else {
			setMessageEmpty(false);
		}
		if (!postData.tags) {
			setTagsEmpty(true);
		} else {
			setTagsEmpty(false);
		}
		if (!postData.selectedFile) {
			setSelectedFileEmpty(true);
		} else {
			setSelectedFileEmpty(false);
		}
		if (
			!postData.title ||
			!postData.message ||
			!postData.tags ||
			!postData.selectedFile
		) {
			setFormVal(false);
			return false;
		}

		setFormVal(true);
		if (currentId === 0) {
			dispatch(createPost(postData));
			clear();
		} else {
			dispatch(updatePost(currentId, postData));
			clear();
		}
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				{
					<div>
						{!titleEmpty ? '' : <div>title is missing</div>}
						{!messageEmpty ? '' : <div>message is missing</div>}
						{!tagsEmpty ? '' : <div>tags is missing</div>}
						{!selectedFileEmpty ? '' : <div>file is missing</div>}
					</div>
				}
				<Typography variant="h6">
					{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}
				</Typography>
				{console.log(titleEmpty)}
				{userSignin.userInfo ? (
					<TextField
						required
						color={titleEmpty ? 'secondary' : 'primary'}
						name="title"
						variant="outlined"
						label="Title"
						fullWidth
						value={postData.title}
						disabled={userSignin.userInfo ? false : true}
						onChange={(e) => setPostData({ ...postData, title: e.target.value })}
					/>
				) : (
					''
				)}
				{userSignin.userInfo ? (
					<TextField
						required
						color={messageEmpty ? 'secondary' : 'primary'}
						name="message"
						variant="outlined"
						label="Message"
						fullWidth
						multiline
						rows={4}
						value={postData.message}
						disabled={userSignin.userInfo ? false : true}
						onChange={(e) => setPostData({ ...postData, message: e.target.value })}
					/>
				) : (
					''
				)}
				{userSignin.userInfo ? (
					<TextField
						color={tagsEmpty ? 'secondary' : 'primary'}
						required
						name="tags"
						variant="outlined"
						label="Tags (coma separated)"
						fullWidth
						value={postData.tags || ''}
						disabled={userSignin.userInfo ? false : true}
						onChange={(e) =>
							setPostData({ ...postData, tags: e.target.value.split(',') })
						}
					/>
				) : (
					''
				)}
				{userSignin.userInfo ? (
					<div className={classes.fileInput}>
						<FileBase
							color={selectedFileEmpty ? 'secondary' : 'primary'}
							required
							type="file"
							multiple={false}
							disabled={userSignin.userInfo ? false : true}
							onDone={({ base64 }) =>
								setPostData({ ...postData, selectedFile: base64 })
							}
						/>
					</div>
				) : (
					''
				)}
				{userSignin.userInfo ? (
					<React.Fragment>
						<Button
							className={classes.buttonSubmit}
							variant="contained"
							color="primary"
							size="large"
							type="submit"
							fullWidth
						>
							Submit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={clear}
							fullWidth
						>
							Clear
						</Button>
					</React.Fragment>
				) : (
					<Button variant="contained" color="secondary" size="small" fullWidth>
						{' '}
						<Link to="/signin" style={{ textDecoration: 'none', color: 'white	' }}>
							Login first
						</Link>
					</Button>
				)}
			</form>
		</Paper>
	);
};

export default Form;
