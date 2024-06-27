const { useNavigate, useParams } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

const { useEffect, useState } = React

export function NoteDetails() {
    const [note, setNote] = useState(null)
    const { noteId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        noteService.get(noteId).then(note => setNote(note))
    }, [noteId])
    if (!note) return <div>Loading...</div>

    return (
        <section
            className='note-details'
            style={{
                backgroundColor: note.style.backgroundColor,
            }}
        >
            <NotePreview note={note} />
            <button
                onClick={ev => {
                    ev.stopPropagation()
                    onRemoveNote(note.id)
                }}
            >
                Remove
            </button>
            <button
                onClick={ev => {
                    ev.stopPropagation()
                    navigate(`/note/edit/${note.id}`)
                }}
            >
                Edit
            </button>
            <button
                onClick={ev => {
                    ev.stopPropagation()
                    navigate(`/note/${note.id}`)
                }}
            >
                Details
            </button>
        </section>
    )
}
