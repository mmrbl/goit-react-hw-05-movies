import { useEffect, useState } from "react";
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useLocation } from "react-router-dom";
import { fetchTrending } from "services/HTTPRequest";


const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation()

  useEffect(() => {
    fetchTrending()
      .then(({results}) => {
      setData(results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => setIsLoading(false))
  }, [])

  if (error) {
    console.log(error)
  }

  return (
    <>
      <h1>Trending today</h1>

      {isLoading ? <RotatingSquare color="orange" /> : 
      <ul>
        {data.map(({id, original_title, name, title}) => {
        return (
          <li key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              <p>{name || title || original_title}</p>
            </Link> 
          </li>
        ) 
      })}
      </ul>
      }

      
    </>
  )
}

export default Home