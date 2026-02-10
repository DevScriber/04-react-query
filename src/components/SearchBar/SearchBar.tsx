import styles from "./SearchBar.module.css";
import toast from 'react-hot-toast';

const notify = () => toast.error('Please enter your search query.');


interface onSubmitProps {
    onSubmit: (query: string) => void
}
export default function SearchBar({ onSubmit }: onSubmitProps) {


    const handleForm = (formData: FormData) => {
        const movieQuery = formData.get('query') as string;

        if (movieQuery.trim() === '') {
            notify()
            return
        }

        onSubmit(movieQuery)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form action={handleForm} className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>

    )
}