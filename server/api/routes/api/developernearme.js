import express from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import * as mapController from '../../controllers/Map.js';

const router = express.Router();

//to fetch developers nearby a user based on longitude and latitude
router.get('/:longitude/:latitude', auth, (req, res) => {
    mapController.getAllDevelopersNearMe(req, res);
});
export default router;