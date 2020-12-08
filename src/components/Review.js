import React from 'react';
import { NavLink } from 'react-router-dom';
import './Review.css';

const Review = (props) => {
    const {id, userId, title, content, stars } = props.review;

return <>
    <div id={`review${id}`} className="indivReviewCard">
        <div className="IndivReviewData">
            <h4 className="indivReviewUserId">userId: {userId}</h4>
            <h3 className="indivReviewTitle">Review Title{title}</h3>
            <div className="indivReviewContent">{content}</div>
            <div className="indivReviewStars">Rating {stars}</div>
        </div>
    </div>
</>
}

export default Review;