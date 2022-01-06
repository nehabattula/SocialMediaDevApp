import * as postAnalysisController from '../../controllers/PostAnalysis.js';
import express from 'express';
import auth from '../../middleware/auth.js';

//API for analytics, to get number of skills based on posts, likes and comments
const router = express.Router();
router.get('/', auth, (req, res) => {
    postAnalysisController.getNumberOfSkillsOfEachType(req, res);
});

export default router;