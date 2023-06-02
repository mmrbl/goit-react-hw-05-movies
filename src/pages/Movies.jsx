
import { useEffect, useState } from "react";
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchByQuery } from "services/HTTPRequest";
import { Button, Form, Input } from "./Movies.styled";

const Movies = () => {
  const [prevQuery, setPrevQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()  
  
  let query = searchParams.get('movie') ?? ''


  const fetchData = () => {

    fetchByQuery(query)
      .then(data => {
        setData(data.results);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false)
        setPrevQuery(query)
      });
  
};

  useEffect(() => {
    fetchData();
}, []);

const handleSubmit = (e) => {
  e.preventDefault();

      if (query === '') {
      return alert('Input the movie name.')
  }

  if (prevQuery === query) {
    return
  }
  
  setIsLoading(true)

  fetchData();
};

  const handleInputChange = (e) => {
    const inputedValue = e.target.value
    if (inputedValue !== '') {
          setSearchParams({movie: inputedValue})
    } else {
      setSearchParams({})
    }

  }
  
  if (error) {
    console.log(error)
  }

   return (
    <div>
      <Form action="" onSubmit={handleSubmit}>
         <Input placeholder="Input the movie name here." type="text" name="film" value={query} onChange={handleInputChange} />
        <Button type="submit">Search</Button>
       </Form>
       
         
       {isLoading ? <RotatingSquare color="orange"/>: 
         <div>
         <ul>
           {data.map((movie) => {
             const {id, name, title, original_title} = movie
          return (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }}>{name || title || original_title}</Link>
            </li>
          )
        })}
           </ul>
           </div>
         }

      
    
    </div>
  )
}

export default Movies
