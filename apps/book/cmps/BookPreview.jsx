export function BookPreview({ book }) {
    const { listPrice } = book

    return (
        <article className='book-prev'>
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt='' />
            <p>
                <span className='bold-txt'>Price:</span> {listPrice.amount}
            </p>
            <p>
                <span className='bold-txt'>Currency:</span> {listPrice.currencyCode}
            </p>
            {listPrice.isOnSale && <img className='on-sale-icon' src='../assets/booksImages/onSale.png.png' alt='' />}
        </article>
    )
}
