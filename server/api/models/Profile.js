import Mongoose from "mongoose";

//schema for profile
const ProfileSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
        type: String
    },
    homelocation: {
        address: { type: String },
        location: {
            type: { type: String, default: "Point" },
            coordinates: { type: [Number] }
        }
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: {
        designation: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        workLocation: {
            type: String
        },
        startingDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        jobDescription: {
            type: String
        }
    },
    education: {
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        currentStudent: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    },
    social: {
        youtube: {
            type: String
        },

        linkedin: {
            type: String
        }

    },
    image: {
        type: String
    },
    badge: {
        type: Number,
        default: 0
    }
});

const Profile = Mongoose.model('profile', ProfileSchema);
export default Profile;