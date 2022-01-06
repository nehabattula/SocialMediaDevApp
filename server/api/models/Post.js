import Mongoose from "mongoose";
const Schema = Mongoose.Schema;
//schema for post
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    postContent: {
        type: String,
        required: true
    },
    postingpersonname: {
        type: String
    },
    postingpersonavatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comment: {
                type: String,
                required: true
            },
            commentingpersonname: {
                type: String
            },
            commentingpersonavatar: {
                type: String
            },
            commentdate: {
                type: Date,
                default: Date.now
            }
        }
    ],
    skills: [],
    postdate: {
        type: Date,
        default: Date.now
    }
});

const Post = Mongoose.model('post', PostSchema);
export default Post;
