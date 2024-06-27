const { useNavigate, useParams } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

const { useEffect, useState, useRef } = React

export function NoteDetails({ onRemoveNote }) {
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
                <NotePreview note={note} />
                <button
                    className='btn-action'
                    onClick={ev => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}
                >
                    <i class='fa-solid fa-trash-can'></i>
                </button>
                <button
                    className='btn-action'
                    onClick={ev => {
                        ev.stopPropagation()
                        navigate(`/note/edit/${note.id}`)
                    }}
                >
                    <i class='fa-solid fa-pen-to-square'></i>
                </button>
            </section>
        </React.Fragment>
    )
}
