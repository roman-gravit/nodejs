const express = require('express');
const {
	getPost, 
	deletePost,
	editPost,
	getPosts,
	addPost
} = require('../controllers/api-post-controller');

const router = express.Router();

// get all Posts
router.get('/api/posts', getPosts);
// Add new Post
router.post('/api/post', addPost);
// Get post by Id
router.get('/api/post/:id', getPost);
// Delete post by Id
router.delete('/api/post/:id', deletePost);
// Update pot by Id
router.put('/api/post/:id', editPost);


module.exports = router;