import * as profileService from '../services/Profile.js';

const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}

//create/update a profile based on profile ID
export const createOrUpdateProfile = async (request, response) => {
    try {
        const profile = { ...request.body };
        const profileid = request.user.id;
        const item = await profileService.createOrUpdateProfile(profile, profileid);
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetched all profiles
export const getAllProfiles = async (request, response) => {
    try {

        const allProfiles = await profileService.getAllProfiles();
        setResponse(allProfiles.statusCode, response, allProfiles.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetched a particular profile by ID
export const getProfileById = async (request, response) => {
    try {
        const allProfiles = await profileService.getProfileById(request.params.id);
        setResponse(allProfiles.statusCode, response, allProfiles.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetch developers based on skills
export const getFilteredData = async (request, response) => {
    try {
        const allProfiles = await profileService.getFilteredData(request);
        setResponse(allProfiles.statusCode, response, allProfiles.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//delete a profile and user based on user ID
export const deleteProfileAndUserById = async (request, response) => {
    try {
        const deleteProfile = await profileService.deleteProfileById(request.user.id);
        setResponse(deleteProfile.statusCode, response, deleteProfile.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

//fetches all github repositories based on github user ID
export const getGithubRepoByProfile = async (request, response) => {
    try {
        const getRepos = await profileService.getGithubRepoByProfile(request.params.username);
        setResponse(getRepos.statusCode, response, getRepos.message);
    }

    catch (e) {
        errorHandler(e.message, response);
    }

}



