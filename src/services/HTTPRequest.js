const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE',
  },
};

async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function fetchTrending() {
  const URL = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
  return fetchData(URL);
}

export async function fetchByQuery(query) {
  const URL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  return fetchData(URL);
}

export async function fetchByID(id) {
  const URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  return fetchData(URL);
}

export async function fetchReviews(id) {
  const URL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  return fetchData(URL);
}

export async function fetchCasts(id) {
  const URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  return fetchData(URL);
}
