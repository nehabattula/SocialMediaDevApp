import express, { response } from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import * as profileController from '../../controllers/Profile.js';

const router = express.Router();

//to create or update a profile
router.post('/', auth,
    check('skills', 'Skills is a required field').notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors });
        }
        profileController.createOrUpdateProfile(req, res);
    });

//API to get all profiles
router.get('/', auth, (req, res) => {
    profileController.getAllProfiles(req, res);
});

//API to get a profile by ID
router.get('/:id', auth, (req, res) => {
    profileController.getProfileById(req, res);
});

//API to get github repos
router.get('/github/:username', (req, res) => {
    try {

        profileController.getGithubRepoByProfile(req, res);
    }
    catch (err) {
        console.error(err.message);
        res.status(500);
    }
});

//to delete profile based on user ID
router.delete('/:id', auth, (req, res) => {
    profileController.deleteProfileAndUserById(req, res);
});

//to filter developers based on skills
router.get('/filter/data/:skill/:name?', auth, (req, res) => {
    profileController.getFilteredData(req, res);
});


export default router;