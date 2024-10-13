import express from 'express';
import {createReview,updateReview,deleteReview,getReviewsByProductId,getReviewById, likeReview, dislikeReview} from '../controllers/reviewController.js';
import {checkLogin} from "../Utils/jwt.js"
const router = express.Router();

router.post('/create-review',checkLogin, createReview);
router.put('/update-review/:reviewId',checkLogin, updateReview);
router.delete('/delete-review/:reviewId',checkLogin, deleteReview);
router.get('/product/:productId', getReviewsByProductId);
router.get('/:reviewId', getReviewById);
router.post('/like-review/:reviewId', checkLogin, likeReview); 
router.post('/dislike-review/:reviewId', checkLogin, dislikeReview); 

export default router;
