const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState, useRef } = React
import { showErrorMsg, eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteDetails() {
    const [note, setNote] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()
    const detailsRef = useRef()

    useEffect(() => {
        noteService.get(noteId).then(note => setNote(note))

        const handleClickOutside = event => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                navigate('/note')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [noteId, navigate])

    if (!note) return <div>Loading...</div>

    return (
        <React.Fragment>
            <div className='backdrop'></div>
            <section
                className='note-details'
                ref={detailsRef}
                style={{
                    backgroundColor: note.style.backgroundColor,
                }}
            >
                <NotePreview note={note} isFromDetails={true} />

                {note.type !== 'NoteAudio' && note.type !== 'NoteCanvas' && (
                    <button
                        className='btn-action'
                        onClick={ev => {
                            ev.stopPropagation()
                            navigate(`/note/edit/${note.id}`)
                        }}
                    >
                        <i className='fa-solid fa-pen-to-square'></i>
                    </button>
                )}
            </section>
        </React.Fragment>
    )
}
