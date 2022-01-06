import * as userController from '../../controllers/User.js';
import express from 'express';
import auth from '../../middleware/auth.js';

//to get check if authenticated user
const router = express.Router();
router.get('/', auth, (req, res) => {
    userController.getAuthenticatedUser(req, res);
});

export default router;