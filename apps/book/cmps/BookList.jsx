import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
    return (
        <section className='books-list'>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <button onClick={() => onRemove(book.id)} className='close'>
                            <i className='fa-regular fa-trash-can'></i>
                        </button>
                        <nav className='book-nav'>
                            <Link to={`/book/${book.id}`}>
                                <button>
                                    <i className='fa-solid fa-circle-info'></i>
                                </button>
                            </Link>
                            <Link to={`/book/edit/${book.id}`}>
                                <button>
                                    <i className='fa-solid fa-pen-to-square'></i>
                                </button>
                            </Link>
                        </nav>
                    </li>
                ))}
            </ul>
        </section>
    )
}
