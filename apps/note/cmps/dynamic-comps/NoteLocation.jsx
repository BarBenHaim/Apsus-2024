const { useState, useEffect, useRef } = React
import { noteService } from '../../services/note.service.js'

export function NoteLocation({ addNote, type }) {
    const [noteInfo, setNoteInfo] = useState({ title: '', location: null })
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markerInstance = useRef(null)

    useEffect(() => {
        if (window.google && mapRef.current) {
            mapInstance.current = new google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            })

            mapInstance.current.addListener('click', event => {
                const latLng = event.latLng
                if (markerInstance.current) {
                    markerInstance.current.setPosition(latLng)
                } else {
                    markerInstance.current = new google.maps.Marker({
                        position: latLng,
                        map: mapInstance.current,
                    })
                }
                setNoteInfo(prevNoteInfo => ({
                    ...prevNoteInfo,
                    location: {
                        lat: latLng.lat(),
                        lng: latLng.lng(),
                    },
                }))
            })
        }
    }, [])

    function handleChange({ target }) {
        const { name: field, value } = target
        setNoteInfo(prevNoteInfo => ({ ...prevNoteInfo, [field]: value }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        const emptyNote = noteService.getEmptyNote()
        const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo }, type }
        addNote(noteToAdd)
        setNoteInfo({ title: '', location: null })
        if (markerInstance.current) {
            markerInstance.current.setMap(null)
            markerInstance.current = null
        }
    }

    return (
        <form className='add-location flex column justify-center' onSubmit={onAddNote}>
            <input
                title='Add note title'
                type='text'
                className='txt-input'
                name='title'
                id='title'
                placeholder='Enter title...'
                onChange={handleChange}
                value={noteInfo.title}
            />
            <div ref={mapRef} style={{ width: '100%', height: '200px' }}></div>

            <button type='submit' className='btn-add-location-note'>
                Add Note
            </button>
        </form>
    )
}
