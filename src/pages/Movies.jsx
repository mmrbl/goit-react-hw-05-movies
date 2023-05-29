
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchByQuery } from "services/HTTPRequest";
import { Button, Form, Input } from "./Movies.styled";

const Movies = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query === '') {
      return alert('Input the movie name')
    }

    setIsLoading(true)

    if (query !== '') {
      fetchByQuery(query)
      .then(data => {
      setData(data.results);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => setIsLoading(false))
      
    } 

    
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value.trim())
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  
  if (error) {
    console.log(error)
  }

   return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
         <Input type="text" name="film" value={query} onChange={handleInputChange} />
        <Button type="submit">Search</Button>
       </Form>
       <div>
      <ul>
           {data.map((movie) => {
             const {id, name, title, original_title} = movie
          return (
            <li key={id}>
              <Link to={`${id}`}>{name || title || original_title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}

export default Movies
