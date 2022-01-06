import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import * as Mail from '../services/Email.js';
import normalize from 'normalize-url';
import gravatar from 'gravatar';

//to create a new user
export const registerNewUser = async (newUser, res) => {
    try {
        var username = newUser.username;
        const user = await User.findOne({ username });
        if (user) {
            let response = { statusCode: 403, message: "User already Exist" };
            return response;
        }
        let registerUser = register(newUser, username)
        newUser = await registerUser.save();
        const payload = {
            user: {
                id: newUser.id
            }
        };
        Mail.sendEmail(registerUser.username);
        const token = jwt.sign(payload, 'mysecret');
        let response = { statusCode: 200, message: token };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}
const register = (newUser, username) => {
    let registerUser = new User();
    registerUser.name = newUser.name;
    registerUser.username = newUser.username;
    registerUser.password = registerUser.setPassword(newUser.password);
    const avatar = normalize(
        gravatar.url(username, {
            s: '200',
            r: 'pg',
            d: 'mm'
        }),
        { forceHttps: true }
    );
    registerUser.image = avatar;
    return registerUser;
}


//to get authenticated user
export const getAuthenticatedUser = async (loggingInUser) => {
    try {
        const user = await User.findById(loggingInUser.user.id).select('-password');
        let response = { statusCode: 200, message: user };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//login user using jwt
export const loginUser = async (user) => {
    try {
        var username = user.username;
        const userMatch = await User.findOne({ username });
        if (!userMatch) {
            let response = { statusCode: 401, message: "Invalid Credentials" };
            return response;
        }
        if (userMatch.validPassword(user.password)) {
            const payload = {
                user: {
                    id: userMatch.id
                }
            }
            const token = jwt.sign(payload, 'mysecret');
            let response = { statusCode: 200, message: token };
            return response;
        }
        let response = { statusCode: 401, message: "Invalid Credentials" };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}