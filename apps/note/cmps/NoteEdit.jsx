const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (noteId) loadNote()
    }, [noteId])

    function loadNote() {
        noteService
            .get(noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService
            .save(noteToEdit)
            .then(() => {
                navigate('/note')
                showSuccessMsg(`Note saved successfully!`)
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        const updatedValue = type === 'checkbox' ? checked : type === 'number' || type === 'range' ? +value : value

        setNoteToEdit(prevNote => ({
            ...prevNote,
            [name]: updatedValue,
        }))
    }

    return (
        <section className='note-edit'>
            <form onSubmit={onSaveNote}>
                <input type='text' name='txt' value={noteToEdit.info.txt} onChange={handleChange} />
                <button type='submit'>Save Note</button>
            </form>
        </section>
    )
}
