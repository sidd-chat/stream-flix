import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'

import './App.css'

import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Header from './components/Header'

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY =  import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  // ! Study App.css
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  // Debounces the search term to prevent too many requests to the API
  // by waiting for the user to stop typing for 400ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = !query
      ? `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      : `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`


      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error("Failed to Fetch Movies!");
      }

      const data = await response.json();
      if(data.Response === 'False') {
        setErrorMessage(data.Error || "Failed to Fetch Movies!")
        setMovies([])
        return;
      }

      setMovies(data.results || [])
    } catch (error) {
      setErrorMessage("Unable to fetch movies! Try again later.")
      setMovies([])
      console.log(`Unable to fetch movies: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm)
  }, [debounceSearchTerm])


  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        {/* <header>
          <img src='hero.png' alt='Hero Banner'/>

          <h1 className=''>
            <span className='text-gradient'>Stream Movies</span> You <span className='text-red-500'>Love</span>
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header> */}

        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner className='mx-auto'/>
          ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
          }
        </section>
      </div>
    </main>
  )
}

export default App