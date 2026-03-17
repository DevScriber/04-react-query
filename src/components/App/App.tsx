import css from './App.module.css'
import { useState } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar"
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from '../utils/ReactPaginateFix';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movie', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== '',
    placeholderData: keepPreviousData
  })

  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null)

  const openModal = (movie: Movie) => setIsModalOpen(movie)
  const closeModal = () => setIsModalOpen(null)

  const handleSearch = async (queryMovie: string) => {
    setQuery(queryMovie)
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

      {!isLoading && data?.results && (
        <MovieGrid onSelect={openModal} movies={data.results} />
      )}

      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />)}

      {isModalOpen && <MovieModal onClose={closeModal} movie={isModalOpen} />}
    </>
  )
}