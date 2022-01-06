import Post from '../models/Post.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

//service to create a post
export const createPost = async (post, userid) => {
    try {
        let newPost = new Post();
        const user = await User.findById(userid).select('--password');
        let userProfile = await Profile.findOne({ user: userid });
        if (userProfile == null || userProfile == undefined) {
            let response = { statusCode: 403, message: "Profile Does Not Exist" };
            return response;
        }
        newPost.user = userid;
        if (post.postContent) newPost.postContent = post.postContent;
        if (post.skills) {
            if (post.skills.includes(",")) {
                newPost.skills = post.skills.split(',').map((skill) => ' ' + skill.trim())
            }
            else {
                newPost.skills = post.skills;
            }
        }
        newPost.postingpersonname = user.name;
        newPost.postingpersonavatar = user.image;
        await newPost.save();
        const postByUser = await Post.find({ user: userid });
        if (postByUser.length == 0) {
            userProfile.badge = 0;
        }
        if (postByUser.length > 0 && postByUser.length <= 10) {
            userProfile.badge = 1;
        }
        if (postByUser.length > 10) {
            userProfile.badge = 2;
        }
        await Profile.findOneAndUpdate({ user: userid }, { $set: userProfile });
        let response = { statusCode: 200, message: newPost };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//gets all posts
export const getAllPost = async () => {
    try {
        const allPosts = await Post.find().sort({ postdate: -1 });
        let response = { statusCode: 200, message: allPosts };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//get a particular post
export const getParticularPost = async (postId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 200, message: post };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//delete a particular post
export const deleteParticularPost = async (postId, userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        if (post.user != userId) {
            let response = { statusCode: 403, message: "User not authorized to delete the post" };
            return response;
        }
        await Post.findByIdAndDelete(postId);
        let response = { statusCode: 200, message: "Post Deleted Successfully" };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//update a particular post
export const updateParticularPost = async (post, userid, postid) => {
    try {
        const oldPost = await Post.findById(postid);
        if (!oldPost) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        if (oldPost.user != userid) {
            let response = { statusCode: 403, message: "User not authorized to update the post" };
            return response;
        }
        oldPost.postContent = post.postContent;
        if (post.skills) {
            if (post.skills.includes(",")) {
                oldPost.skills = post.skills.split(',').map((skill) => ' ' + skill.trim())
            }
            else {
                oldPost.skills = post.skills;
            }
        }
        await oldPost.save();
        let response = { statusCode: 200, message: "Post Updated Successfully" };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//like a post
export const likePost = async (postId, userId) => {
    try {
        let post = await Post.findById(postId);
        let available = false;
        if (!post) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        post.likes.forEach(element => {
            if (element.user == userId) {
                available = true;
            }
        });
        if (available) {
            let response = { statusCode: 500, message: "Post Already Liked" };
            return response;
        }
        post.likes.unshift({ user: userId })
        await post.save();
        let response = { statusCode: 200, message: post.likes };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//unlike a post
export const unLikePost = async (postId, userId) => {
    try {
        let post = await Post.findById(postId);
        let index = 0;
        if (!post) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        post.likes.forEach(element => {
            if (element.user == userId) {
                post.likes.splice(index, 1);
                return;
            }
            else {
                index++;
            }
        });
        await post.save();
        let response = { statusCode: 200, message: post.likes };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//posting a comment 
export const postComment = async (postId, userId, newComment) => {
    try {
        let oldPost = await Post.findById(postId);
        let commentingUser = await User.findById(userId).select('--password');
        if (!oldPost) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        oldPost.comments.unshift({
            user: userId,
            comment: newComment,
            commentingpersonname: commentingUser.name,
            commentingpersonavatar: commentingUser.image
        })
        await oldPost.save();
        let response = { statusCode: 200, message: oldPost.comments };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//updating a comment based post ID an comment ID
export const updateComment = async (postId, userId, comment, commentId) => {
    try {
        var canUpdateComment = false;
        let oldPost = await Post.findById(postId);
        if (!oldPost) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        oldPost.comments.forEach(element => {
            if (element.user == userId && element.id == commentId) {
                element.comment = comment;
                canUpdateComment = true;
            }
        });
        if (!canUpdateComment) {
            let response = { statusCode: 403, message: "Cannot update comment" };
            return response;
        }
        await oldPost.save();
        let response = { statusCode: 200, message: "Comment Updated" };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//deleting a comment based on post ID and comment ID
export const deleteComment = async (postId, userId, commentId) => {
    try {
        let index = 0;
        let canDelete = false;
        let post = await Post.findById(postId);
        if (!post) {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        post.comments.forEach(element => {
            if (element.user == userId && element.id == commentId) {
                canDelete = true;
                post.comments.splice(index, 1);
            }
            else {
                index++;
            }
        });
        if (!canDelete) {
            let response = { statusCode: 400, message: "Comment not found" };
            return response;
        }
        await post.save();
        let response = { statusCode: 200, message: "Comment Deleted" };
        return response;
    }
    catch (e) {
        if (e.kind === 'ObjectId') {
            let response = { statusCode: 400, message: "Post Does not Exist" };
            return response;
        }
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}
