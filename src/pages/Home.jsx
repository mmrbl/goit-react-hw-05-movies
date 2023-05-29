import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrending } from "services/HTTPRequest";


const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {data.map(({id, original_title, name, title}) => {
        return (
          <li key={id}>
            <Link to={`movies/${id}`}>
              <p>{name || title || original_title}</p>
            </Link> 
          </li>
        ) 
      })}
      </ul>
    </>
  )
}

export default Home