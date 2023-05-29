import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { fetchByID } from "services/HTTPRequest";
import defaultImage from "../services/noimage.png";
import { Button, Container, MovieInfo, CastList } from "./MovieDetails.styled";



const MovieDetails = () => {
  const backTo = useNavigate()
  const { movieId } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);


  

  
  useEffect(() => {
    fetchByID(movieId)
      .then(data => {
      setData(data);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => setIsLoading(false))
  }, [movieId]);

  const { name, title, original_title, overview, genres, poster_path, vote_average, success} = data

  const goHome = () => {
    return backTo('/')
  }

  if (!data) {
    return
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (success === false) {
    console.log(data)
    return (
      <p>We have no information about this fiml :c</p>
    )
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <Button onClick={goHome} > &#8592; Go back</Button>

      <Container style={{ display: 'flex'}}>
        <img src={poster_path ? 'https://image.tmdb.org/t/p/w300' + poster_path : defaultImage} alt={name || title || original_title} />
        <MovieInfo>
          <h1>{name ?? title ?? original_title}</h1>

           { vote_average && vote_average !== 0 ?
            <p>User Score: {(vote_average * 10).toFixed(2)}%</p> : <p>Users have not rated this movie</p>}
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul>
          {genres ? 
            genres.map((genre) => {
              const {id, name} = genre
              return (
                <li key={id}>{name}</li>
              )
            }) : <span>Unavaliable</span>
          }
          </ul>
        </MovieInfo>
        
      </Container>
      <h3>Additional information</h3>
      <ul>
        <li><Link to='cast'>Cast</Link></li>
        <li><Link to='reviews'>Reviews</Link></li>
      </ul>
          
      <Outlet/>
    </>
  )
}

export default MovieDetails
