const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { booksService } from '../services/books.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function BookIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(booksService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        booksService.query(filterBy).then(setBooks)
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }
    function removeBook(bookId) {
        booksService
            .remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id))
                showSuccessMsg('Book has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove book`)
                navigate('/book')
            })
    }
    const { minPrice, title, maxPrice } = filterBy
    return (
        <div className='books-container'>
            <BookFilter filterBy={{ minPrice, title }} onFilterBy={onSetFilterBy} />
            <BookFilterMaxPrice filterBy={{ maxPrice }} onFilterBy={onSetFilterBy} />
            <Link to='/book/edit'>
                <button className='add-book'>Add book</button>
            </Link>
            <BookList books={books} onRemove={removeBook} />
        </div>
    )
}

function BookFilterMaxPrice() {}
