import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrending } from "services/HTTPRequest";


const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)

    fetchTrending()
      .then(({results}) => {
      setData(results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(setIsLoading(false))
  }, [])

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {data.map((result) => {
        const {id, original_title, name, title} = result
        return (
          <li key={id}>
            <Link to={`movies/${id}`}>
              <h2>{name ?? title ?? original_title}</h2>
            </Link> 
          </li>
        ) 
      })}
      </ul>
    </>
  )
}

export default Home