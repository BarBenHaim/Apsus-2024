export function SearchBooksList({ booksList, onSave }) {
    return (
        <ul className='google-search-list'>
            {booksList.map(book => (
                <li key={book.id}>
                    <span>{book.title}</span>
                    <button onClick={() => onSave(book)}>+</button>
                </li>
            ))}
        </ul>
    )
}
