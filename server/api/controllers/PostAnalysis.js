import * as PostAnalysis from '../services/PostAnalysis.js';

const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}

//fetches skills based on likes, posts and comments
export const getNumberOfSkillsOfEachType = async (request, response) => {
    try {
        let userId = request.user.id;
        const item = await PostAnalysis.getNumberOfSkillsOfEachType(userId);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}