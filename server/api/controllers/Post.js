import * as postService from '../services/Post.js';

const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}

//creating a post for a user based on user ID
export const createPost = async (request, response) => {
    try {
        const post = { ...request.body };
        const userid = request.user.id;
        const item = await postService.createPost(post, userid);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetches all the posts of users
export const getAllPost = async (request, response) => {
    try {
        const item = await postService.getAllPost();
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetch a particular post by post ID
export const getParticularPost = async (request, response) => {
    try {
        const postId = request.params.id;
        const item = await postService.getParticularPost(postId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//delete a particular post by post ID
export const deleteParticularPost = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const item = await postService.deleteParticularPost(postId, userId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//update a particular post by post ID for a user
export const updateParticularPost = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const post = request.body;
        const item = await postService.updateParticularPost(post, userId, postId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//like a particular post by post ID
export const likePost = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const item = await postService.likePost(postId, userId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//unlike a particular post by post ID
export const unLikePost = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const item = await postService.unLikePost(postId, userId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//post a comment for  post based on post ID
export const postComment = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const comment = request.body.comment
        const item = await postService.postComment(postId, userId, comment);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//update a comment for a post based on post ID and comment ID
export const updateComment = async (request, response) => {
    try {
        const postId = request.params.id;
        const commentId = request.params.commentId;
        const userId = request.user.id;
        const comment = request.body.comment
        const item = await postService.updateComment(postId, userId, comment, commentId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//delete a comment for a post based on post ID and comment ID
export const deleteComment = async (request, response) => {
    try {
        const postId = request.params.id;
        const userId = request.user.id;
        const commentId = request.params.commentId;
        const item = await postService.deleteComment(postId, userId, commentId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

