const { useState } = React
export function NoteFilter({ onSetFilterBy }) {
    const [activeFilter, setActiveFilter] = useState('All')

    function handleFilterChange(filterType) {
        setActiveFilter(filterType)
        onSetFilterBy({ type: filterType })
    }

    return (
        <section className='note-filter flex column animate__animated animate__fadeInLeft'>
            <button
                className={`btn-filter ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => handleFilterChange('All')}
            >
                <i className='fa-solid fa-icons'></i>
                <span>All</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteTxt' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteTxt')}
            >
                <i className='fa-regular fa-message'></i>
                <span>Texts</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteImg' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteImg')}
            >
                <i className='fa-regular fa-image'></i>
                <span>Images</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteVideo' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteVideo')}
            >
                <i className='fa-brands fa-youtube'></i>
                <span>Videos</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteTodos' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteTodos')}
            >
                <i className='fa-solid fa-list'></i>
                <span>Lists</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteAudio' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteAudio')}
            >
                <i className='fa-solid fa-music'></i>
                <span>Music</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteCanvas' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteCanvas')}
            >
                <i className='fa-solid fa-paintbrush'></i>
                <span>Paintings</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteLocation' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteLocation')}
            >
                <i className='fa-solid fa-location-dot'></i>
                <span>Locations</span>
            </button>
            <button
                className={`btn-filter ${activeFilter === 'NoteRecording' ? 'active' : ''}`}
                onClick={() => handleFilterChange('NoteRecording')}
            >
                <i className='fa-solid fa-microphone'></i>
                <span>Recordings</span>
            </button>
        </section>
    )
}
