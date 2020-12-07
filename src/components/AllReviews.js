import React from 'react';
import Review from './Review.js';
import './AllReviews.css'

const AllReviews = (props) => {
    const {allReviews} = props;

return <>
        <div className="reviewsGrid">
        {
        allReviews.map((review) => <Review key={review.id} review={review} />)
        }
        </div>
</>
}

export default AllReviews;