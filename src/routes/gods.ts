import express from 'express';
import loverController from '../controllers/gods';
import  deathController  from '../controllers/deathcontroller';


const router = express.Router();


router.get('/lover', loverController.getLover.bind(loverController));
router.get('/death', deathController.getDeath.bind(deathController));

export default router;