import { booksService } from '../services/books.service.js'
import { SearchBooksList } from './SearchBooksList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function AddBook() {
    const [booksList, setBooksList] = useState()
    const navigate = useNavigate()
    const handleSearchDebounce = useRef(utilService.debounce(handleSearch, 1500))

    function handleSearch({ target }) {
        booksService.getGoogleBooks(target.value).then(books => setBooksList(books))
    }

    function onSave(book) {
        booksService
            .addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    return (
        <div className='book-search'>
            <div className='add-book-title'>
                <span className='bold-txt'>Google Search: </span>
                <input
                    onChange={handleSearchDebounce.current}
                    type='text'
                    name='title'
                    placeholder='Insert book name'
                />
                <button>Reset</button>
            </div>
            {booksList && <SearchBooksList booksList={booksList} onSave={onSave} />}
        </div>
    )
}
