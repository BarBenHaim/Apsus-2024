const { useState, useEffect } = React

export function NoteSearchFilter({ onSetFilterBy, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className='note-search-filter animate__animated animate__fadeInRight'>
            <input
                title='search note'
                type='search'
                name='txt'
                id='txt'
                value={filterByToEdit.txt}
                onChange={handleChange}
                placeholder='Search note'
            />
        </section>
    )
}
