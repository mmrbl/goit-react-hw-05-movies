import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "services/HTTPRequest";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams()
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews(movieId)
      .then(({results}) => {
      setReviews(results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => setIsLoading(false))
  }, [movieId]);

  if (isLoading) {
    return <p>Loading reviews.</p>
  }

  if (!reviews) {
    return 
  } 

  if (error) {
    new Error(error.message)
  }

  if (reviews && reviews.length > 0) {
    return (
    <ul>
      {reviews.map((review) => {
        const { author_details: { username }, content, id} = review
        return (
          <li key={id}>
            <h3>{username}</h3>
            <p>{content}</p>
          </li>
        )
      })}
    </ul>
  )
  } else {
    return (
      <p>We don't have any reviews for this movie.</p>
    )
  }

  

  
  
}



export default Reviews
