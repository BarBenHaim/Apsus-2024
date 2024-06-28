const { useState } = React

export function NoteFilter({ onSetFilterBy }) {
    const [activeFilter, setActiveFilter] = useState('All')

    function handleFilterChange(filterType) {
        setActiveFilter(filterType)
        onSetFilterBy({ type: filterType })
    }

    return (
        <section className='note-filter flex column'>
            <button
                className={`btn-filter ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => handleFilterChange('All')}
            >
                All
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteTxt' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteTxt')}
            >
                Texts
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteImg' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteImg')}
            >
                Images
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteVideo' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteVideo')}
            >
                Videos
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteTodos' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteTodos')}
            >
                Lists
            </button>
        </section>
    )
}
