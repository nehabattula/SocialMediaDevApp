import * as userController from '../../controllers/User.js';
import express from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();
//to register a user
router.post('/register', [
    check('name', 'Name is a required field ').not().isEmpty(),
    check('username', 'Please include a valid username').not().isEmpty().isEmail(),
    check('password', 'Password is a required field').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors });
    }
    userController.registerNewUser(req, res);
});

//login a user
router.post('/login', [
    check('username', 'Please include a valid username').not().isEmpty().isEmail(),
    check('password', 'Password is a required field').not().isEmpty().matches()
], (req, res) => {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors });
    }
    userController.loginUser(req, res);
});

export default router;