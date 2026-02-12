import type { IMovie } from './../types/movie';
import axios from "axios"
import toast from "react-hot-toast";

interface MovieHttpResponse {
    results: IMovie[]
    total_pages: number
}

interface IFetchMovies {
    query: string,
    page: number
}

export default async function fetchMovies({query, page}:IFetchMovies) {
    const myKey = import.meta.env.VITE_TMDB_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie`;

    const options = {
        params: {
            query,
            page
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    };

    const response = await axios.get<MovieHttpResponse>(url, options);

    if (response.data.results.length === 0) {
        toast.error('No movies found for your request.');
    }

    return (
        response.data
    )
}