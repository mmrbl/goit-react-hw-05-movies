import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCasts } from 'services/HTTPRequest';
import noPhoto from "../services/noPhoto.png";
import { CastItem, CastList } from './Cast.styled';
import { RotatingSquare } from 'react-loader-spinner';



const Cast = () => {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams()
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCasts(movieId)
      .then(({cast}) => {
      setCasts(cast);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => setIsLoading(false))
    
  }, [movieId]);

  if (isLoading) {
    return <RotatingSquare color="orange"/>
  }

  if (error) {
    console.log(error)
  }

  if (casts && casts.length !== 0) {
    return (
    <div>
      <CastList>
        {casts.map((cast) => {
          const { character, name, id, profile_path } = cast
          return (
            <CastItem key={id}>
              <img src={profile_path ? 'https://image.tmdb.org/t/p/w200' + profile_path : noPhoto} alt={name} />
              <h3>{name}</h3>
              <p>Character: {character}</p>
            </CastItem>
          )
        })}
      </CastList>
    </div>
  )
  } else {
    return (
      <p>We don't have any casts for this movie.</p>
    )
  }

  
}

export default Cast


