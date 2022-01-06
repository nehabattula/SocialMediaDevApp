import * as userService from '../services/User.js';
import jwt from 'jsonwebtoken';

const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}

//create a new user
export const registerNewUser = async (request, response) => {
    try {
        const user = { ...request.body };
        const item = await userService.registerNewUser(user, response);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//to check if the user is authenticted
export const getAuthenticatedUser = async (request, response) => {
    try {
        const checkAuthenticationStatus = await userService.getAuthenticatedUser(request);
        setResponse(checkAuthenticationStatus.statusCode, response, checkAuthenticationStatus.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//to login a user
export const loginUser = async (request, response) => {
    try {
        const user = { ...request.body };
        const item = await userService.loginUser(user);
        setResponse(item.statusCode, response, item.message);

    }
    catch (e) {
        errorHandler(e.message, response);
    }
}