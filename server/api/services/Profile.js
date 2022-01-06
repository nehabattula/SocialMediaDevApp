import Profile from '../models/Profile.js';
import User from '../models/User.js';
import Map from '../models/Map.js';
import Post from '../models/Post.js';
import config from '../../config/configdata.js';
import axios from 'axios';


//to create and update a profile
export const createOrUpdateProfile = async (userProfile, id) => {
    try {
        let existingProfile = await Profile.findOne({ user: id });
        const map = new Map();
        if (existingProfile) {
            await Profile.findOneAndUpdate({ user: id }, { $set: userProfile });
            let response = { statusCode: 200, message: "Profile Updated Successfully" };
            return response;
        } else {
            let profile = createNewProfile(userProfile, id);
            await profile.save();
            map.user = id;
            map.location = userProfile.homelocation.location;
            await map.save();
            let response = { statusCode: 200, message: "Profile Created Successfully" };
            return response;
        }
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//returns all profiles
export const getAllProfiles = async () => {
    try {
        const allProfiles = await Profile.find().populate('user', ['name', 'image']);
        let response = { statusCode: 200, message: allProfiles };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//fetches a profile based on ID
export const getProfileById = async (id) => {
    try {
        const profile = await Profile.findOne({ user: id }).populate('user', ['name', 'image']);
        if (!profile) {
            let response = { statusCode: 500, message: "No user present" };
            return response;
        }
        let response = { statusCode: 200, message: profile };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//gets developers based on skills
export const getFilteredData = async (request) => {
    try {
        let filteredData = [];
        const filterSkill = request.params.skill;
        const filterName = request.params.name;
        const allProfiles = await Profile.find().populate('user', ['name', 'image']);
        allProfiles.forEach(element => {
            if (filterName != null && filterName != "") {
                if (filterSkill == "Any") {
                    if (element.user.name.toLowerCase().includes(filterName.toLowerCase())) {
                        filteredData.push(element);
                    }
                }
                if (filterSkill != "Any") {
                    element.skills.forEach(skill => {
                        if (element.user.name.toLowerCase().includes(filterName.toLowerCase()) && skill.trim() == filterSkill) {
                            filteredData.push(element);
                        }
                    });
                }
            }
            else {
                if (filterSkill == "Any") {
                    filteredData.push(element);
                }
                if (filterSkill != "Any") {
                    element.skills.forEach(skill => {
                        if (skill.trim() == filterSkill) {
                            filteredData.push(element);
                        }
                    })
                }
            }
        });
        if (!allProfiles) {
            let response = { statusCode: 500, message: "No user present" };
            return response;
        }
        let response = { statusCode: 200, message: filteredData };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//delete a particular profile
export const deleteProfileById = async (id) => {
    try {
        await Profile.findOneAndDelete({ user: id });
        await User.findOneAndDelete({ _id: id });
        let posts = await Post.find({ user: id });
        for (var i = 0; i < posts.length; i++) {
            await Post.findOneAndDelete({ user: id });
        }
        let response = { statusCode: 200, message: 'User deleted successfully' };
        return response;
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}

//get githubrepositories by profile name
export const getGithubRepoByProfile = async (username) => {
    try {
        let params = new URLSearchParams();
        let user = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=config.githubClientId&client_secret=config.githubSecret`;
        var response = await axios.get(user
            , params, {
            headers: {
                'user-agent': 'node.js'
            }
        });
        const gitRepos = [];
        response.data.forEach(element => {
            gitRepos.push(element.name)
        });
        if (gitRepos.length > 0) {
            return { statusCode: 200, message: gitRepos };
        }

        return { statusCode: 500, message: "No repo found" };
    }
    catch (e) {
        let response = { statusCode: 500, message: e.message };
        return response;
    }

}
const createNewProfile = (userProfile, id) => {
    const profile = new Profile();
    profile.user = id;
    if (userProfile.website) profile.website = userProfile.website;
    if (userProfile.homelocation) profile.homelocation = userProfile.homelocation;
    if (userProfile.skills) {
        profile.skills = userProfile.skills.split(',').map((skill) => ' ' + skill.trim())
    }
    if (userProfile.bio) profile.bio = userProfile.bio;
    if (userProfile.githubusername) profile.githubusername = userProfile.githubusername;
    if (userProfile.social.youtube) profile.social.youtube = userProfile.social.youtube;
    if (userProfile.social.linkedin) profile.social.linkedin = userProfile.social.linkedin;
    if (userProfile.experience.designation) profile.experience.designation = userProfile.experience.designation;
    if (userProfile.experience.company) profile.experience.company = userProfile.experience.company;
    if (userProfile.experience.workLocation) profile.experience.workLocation = userProfile.experience.workLocation;
    if (userProfile.experience.startingDate) profile.experience.startingDate = userProfile.experience.startingDate;
    if (userProfile.experience.endDate) profile.experience.endDate = userProfile.experience.endDate;
    if (userProfile.experience.current) profile.experience.current = userProfile.experience.current;
    if (userProfile.experience.jobDescription) profile.experience.jobDescription = userProfile.experience.jobDescription;
    if (userProfile.education.school) profile.education.school = userProfile.education.school;
    if (userProfile.education.degree) profile.education.degree = userProfile.education.degree;
    if (userProfile.education.fieldofstudy) profile.education.fieldofstudy = userProfile.education.fieldofstudy;
    if (userProfile.education.from) profile.education.from = userProfile.education.from;
    if (userProfile.education.to) profile.education.to = userProfile.education.to;
    if (userProfile.education.currentStudent) profile.education.currentStudent = userProfile.education.currentStudent;
    if (userProfile.education.description) profile.education.description = userProfile.education.description;
    return profile;
}