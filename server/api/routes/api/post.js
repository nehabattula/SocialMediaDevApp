import * as postController from '../../controllers/Post.js';
import express from 'express';
import auth from '../../middleware/auth.js';

const router = express.Router();
//to create a post
router.post('/', auth, (req, res) => {
    postController.createPost(req, res);
});

//to get all posts
router.get('/', auth, (req, res) => {
    postController.getAllPost(req, res);
});

//to get a particular post by ID
router.get('/:id', auth, (req, res) => {
    postController.getParticularPost(req, res);
});

//to delete a particular post by ID
router.delete('/:id', auth, (req, res) => {
    postController.deleteParticularPost(req, res);
});

//to update a particular post by ID
router.put('/:id', auth, (req, res) => {
    postController.updateParticularPost(req, res);
});

//to like a particular post by ID
router.put('/like/:id', auth, (req, res) => {
    postController.likePost(req, res);
});

//to unlike a particular post by ID
router.put('/unlike/:id', auth, (req, res) => {
    postController.unLikePost(req, res);
});

//to comment on a particular post by ID
router.post('/comment/:id', auth, (req, res) => {
    postController.postComment(req, res);
});

//to update a particular comment of a post based on post ID and comment ID
router.put('/comment/:id/:commentId', auth, (req, res) => {
    postController.updateComment(req, res);
});

//to delete a particular comment of a post based on post ID and comment ID
router.delete('/comment/:id/:commentId', auth, (req, res) => {
    postController.deleteComment(req, res);
});
export default router;