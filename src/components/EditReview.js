import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { getReview, getAllReviews, BASE } from '../api';
import './EditReview.css';
import Swal from 'sweetalert2';

const EditReview = (props) => {
    const {reviewId} = useParams()
    const {token, isAdmin} = props;
    const [editReview, setEditReview] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState('');
    const [userId, setUserId] = useState('');
    const [reviewForm, setReviewForm] = useState('');

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newStars, setNewStars] = useState('');
    const [newUserId, setNewUserId] = useState('');

    useEffect(() => {
        getReview(reviewId)
            .then( responseReview => {
                setEditReview(responseReview)
                setNewTitle(responseReview.title)
                setNewContent(responseReview.content)
                setNewStars(responseReview.stars)
                setNewUserId(responseReview.userId)
            })
    }, [])
   

    const handleEditReview = async (event) => {
        try {
            event.preventDefault();

            const {data} = await axios.patch(`${BASE}/reviews/${reviewId}`, {title: newTitle, content: newContent, stars: newStars, userId: newUserId},{headers: {'Authorization': 'Bearer '+token}})
            setEditReview(data)


          return data;
        } catch (error) {
          console.error(error)
          throw error
        }
    }

    const history = useHistory();

    function handleClick() {
        history.push(`/AllProducts/${reviewId}`);
    }

    function editReviewClick() {
        setReviewForm(true)
    }

return <>



</>

}

export default EditReview;