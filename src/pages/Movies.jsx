
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchByQuery } from "services/HTTPRequest";

const Movies = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault()

    setIsLoading(true)

    fetchByQuery(query)
      .then(data => {
      setData(data.results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(setIsLoading(false))
  }

  function handleInputChange(e) {
    setQuery(e.target.value)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

   return (
    <div>
      <form action="" onSubmit={handleSubmit}>
         <input type="text" name="film" value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
       </form>
       <div>
      <ul>
           {data.map((movie) => {
             const {id, name, title, original_title} = movie
          return (
            <li key={id}>
              <Link to={`${id}`}>{name ?? title ?? original_title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}

export default Movies
