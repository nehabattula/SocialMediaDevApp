import * as mapService from '../services/Map.js';
const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message); //testing
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}

//fetches all developers neaby based on coordinates
export const getAllDevelopersNearMe = async (request, response) => {
    try {
        const allDevelopers = await mapService.getAllDevelopersNearMe(request);
        setResponse(allDevelopers.statusCode, response, allDevelopers.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}