import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "services/HTTPRequest";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams()
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    fetchReviews(movieId)
      .then(({results}) => {
      setReviews(results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(setIsLoading(false))
  }, [movieId]);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (!reviews) {
    return 
  } 

  if (reviews.length !== 0) {
    return (
    <ul>
      {reviews.map((review) => {
        const { author_details: { username }, content} = review
        return (
          <li>
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
