import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar"
import FetchMovies from "./services/movieService";
import type { IMovie } from "./types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";

const notify = () => toast.error('No movies found for your request.')

export default function App() {

  const [movies, setMovies] = useState<IMovie[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState<IMovie | null>(null)

  const openModal = (movie: IMovie) => setIsModalOpen(movie)
  const closeModal = () => setIsModalOpen(null)


  const handleSearch = async (queryMovie: string) => {

    try {

      setMovies([])
      setError(false)
      setLoading(true)

      const data = await FetchMovies(queryMovie)

      // Задержка, чтоб Loader отображался 1 секунду

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.results.length === 0) {
        notify()
        return
      }

      setMovies(data.results)

    } catch {
      setError(true)

    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid onSelect={openModal} movies={movies} />
      )}

      {isModalOpen && <MovieModal onClose={closeModal} movie={isModalOpen} />}
    </>
  )
}