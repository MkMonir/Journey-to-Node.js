const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getReviews)
  .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

module.exports = router;
