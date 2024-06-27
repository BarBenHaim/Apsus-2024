const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteSetFormByType } from './NoteSetFormByType.jsx'

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
                showSuccessMsg('Note saved successfully!')
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setNoteToEdit(prevNote => {
            const keys = field.split('.')
            const updatedNote = { ...prevNote }

            let nestedObject = updatedNote
            for (let i = 0; i < keys.length - 1; i++) {
                nestedObject = nestedObject[keys[i]] = { ...nestedObject[keys[i]] }
            }
            nestedObject[keys[keys.length - 1]] = value

            return updatedNote
        })
    }

    return (
        <section className='note-edit'>
            <form onSubmit={onSaveNote}>
                <NoteSetFormByType note={noteToEdit} handleChange={handleChange} />
                <button type='submit'>Save Note</button>
            </form>
        </section>
    )
}
