
import Post from '../models/Post.js';

//fetches skills based on likes, comments and posts
export const getNumberOfSkillsOfEachType = async (userId) => {
    try {
        const posts = await Post.find({ user: userId });
        const post = postAnalysis(posts);
        const comment = commentAnalysis(posts);
        const like = likeAnalysis(posts);
        const analysedSkills = {
            post,
            comment,
            like
        }

        let response = { statusCode: 200, message: analysedSkills };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//function for analyzing skills based on posts
const postAnalysis = (posts) => {
    let java = 0;
    let c = 0;
    let python = 0;
    let other = 0;
    posts.forEach(post => {
        post.skills.forEach(skill => {
            if (skill.trim().localeCompare("Java", undefined, { sensitivity: 'base' }) == 0) {
                java++;
            }
            else if (skill.trim().localeCompare("C++", undefined, { sensitivity: 'base' }) == 0) {
                c++;
            }
            else if (skill.trim().localeCompare("Python", undefined, { sensitivity: 'base' }) == 0) {
                python++;
            }
            else {
                other++;
            }

        })
    });

    const post = {
        "Java": java,
        "C++": c,
        "Python": python,
        "Other": other
    }
    return post;
}

//function for analyzing skills based on comments
const commentAnalysis = (posts) => {
    let java = 0;
    let c = 0;
    let python = 0;
    let other = 0;

    posts.forEach(post => {
        post.skills.forEach(skill => {
            if (skill.trim().localeCompare("Java", undefined, { sensitivity: 'base' }) == 0) {

                java = java + post.comments.length;
            }
            else if (skill.trim().localeCompare("C++", undefined, { sensitivity: 'base' }) == 0) {

                c = c + post.comments.length;
            }
            else if (skill.trim().localeCompare("Python", undefined, { sensitivity: 'base' }) == 0) {

                python = python + post.comments.length;
            }
            else {
                other = other + post.comments.length;
            }
        })

    });

    const comment = {
        "Java": java,
        "C++": c,
        "Python": python,
        "Other": other
    }

    return comment;

}

//function for analyzing skills based on likes
const likeAnalysis = (posts) => {
    let java = 0;
    let c = 0;
    let python = 0;
    let other = 0;

    posts.forEach(post => {
        post.skills.forEach(skill => {
            if (skill.trim().localeCompare("Java", undefined, { sensitivity: 'base' }) == 0) {
                java = java + post.likes.length;
            }
            else if (skill.trim().localeCompare("C++", undefined, { sensitivity: 'base' }) == 0) {
                c = c + post.likes.length;
            }
            else if (skill.trim().localeCompare("Python", undefined, { sensitivity: 'base' }) == 0) {
                python = python + post.likes.length;
            }
            else {
                other = other + post.likes.length;
            }
        })
    });

    const like = {
        "Java": java,
        "C++": c,
        "Python": python,
        "Other": other
    }

    return like;

}




