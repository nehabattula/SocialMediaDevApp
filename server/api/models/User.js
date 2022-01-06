import Mongoose from "mongoose";
import crypto from 'crypto';
//schema for user
const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: "name is a required field."
    },
    username: {
        type: String,
        required: "Username is a required field.",
        unique: true
    },
    password: {
        type: String,
        required: "Password is a required field."
    },
    image: {
        type: String
    },
    hash: String,
    salt: String
}, {
    versionKey: false
});
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
    return this.hash;
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};


const User = Mongoose.model('user', UserSchema);
export default User;