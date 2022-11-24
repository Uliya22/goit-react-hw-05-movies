import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../API/getApi';
import Loader from '../../components/loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState('');
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setStatus('pending');

    getMovieReviews(movieId)
      .then(responce => {
        setReviews(responce.data.results); 
        setStatus('resolved');
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }, [movieId]);

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <div className={css.reviewsContainer}>
        <h2 className={css.reviewsTitle}>Reviews &#11015;</h2>
        {reviews.length > 0 ? (
          <ul className={css.reviewsList}>
            {reviews.map(review => (
              <li className={css.reviewstItem} key={review.id}>
                <p className={css.reviewsAuthor}>Author: {review.author}</p>
                <p className={css.reviewsText}>Character: {review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.noRreviewsText}>
            We don't have any reviews for this movie
          </p>
        )}
      </div>
    );
  }
};

export default Reviews;