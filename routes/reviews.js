const express = require('express');
const reviewsRouter = express.Router()
const { createReview, getReviewById, getAllReviews } = require('../db/reviews');

reviewsRouter.get('/', async (req,res,next) => {
    try {
        const allReviews = await getAllReviews()
        res.send(allReviews)
    } catch (error) {
      res.send(error)
    }
})

reviewsRouter.get('/:reviewId', async (req, res, next) => {
    try {
        const {reviewId} = req.params
        const review = getReviewById(reviewId)

        res.send(review)
    } catch (error) {
        res.send(error)
    }
})

module.exports = reviewsRouter