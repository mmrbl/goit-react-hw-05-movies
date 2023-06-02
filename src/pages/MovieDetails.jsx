import { Suspense, useEffect, useRef, useState } from "react";
import { RotatingSquare } from 'react-loader-spinner';
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchByID } from "services/HTTPRequest";
import defaultImage from "../services/noimage.png";
import { AboutMovie, Button, Container, MovieInfo } from "./MovieDetails.styled";




const MovieDetails = () => {
  const location = useLocation()
  const { movieId } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const backLinkRef = useRef(location.state?.from ?? '/movies')

  console.log(backLinkRef)
  
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

  if (!data) {
    return
  }

  if (isLoading) {
    return <RotatingSquare color="orange"/>
  }

  if (success === false) {
    return (
      <p>We have no information about this fiml :c</p>
    )
  }

  if (error) {
    console.log(error)
  }


  return (
    <Container>
      <Button to={backLinkRef.current}> &#8592; Go back</Button>

      <AboutMovie style={{ display: 'flex'}}>
        <img width='300' src={poster_path ? 'https://image.tmdb.org/t/p/w300' + poster_path : defaultImage} alt={name || title || original_title} />
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
        
      </AboutMovie>
      <h3>Additional information</h3>
      <ul style={{listStyle: 'none'}}>
        <li><Link to='cast'>Cast</Link></li>
        <li><Link to='reviews'>Reviews</Link></li>
      </ul>
        <Suspense fallback={<div>LOADING...</div>}>
          <Outlet />
        </Suspense>
    </Container>
  )
}

export default MovieDetails
