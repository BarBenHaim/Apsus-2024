const { useNavigate, useParams, useLocation } = ReactRouterDOM
const { useState, useEffect } = React
import { showSuccessMsg, eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { NoteSetFormByType } from './NoteSetFormByType.jsx'

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
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
                eventBusService.emit('edit-notes')
                setIsLoading(true)
                setTimeout(() => {
                    navigate('/note')
                    showSuccessMsg('Note saved successfully!')
                }, 500)
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

    function handleCloseEdit() {
        navigate('/note')
    }

    return (
        <section
            className='note-edit'
            style={{
                backgroundColor: noteToEdit.style.backgroundColor,
            }}
        >
            <button className='btn-close-edit' onClick={handleCloseEdit}>
                x
            </button>
            <NotePreview note={noteToEdit} />
            <form onSubmit={onSaveNote}>
                <NoteSetFormByType note={noteToEdit} handleChange={handleChange} />
                {!isLoading ? (
                    <button type='submit' className='btn-edit-submit'>
                        Save Note
                    </button>
                ) : (
                    <div>loading...</div>
                )}
            </form>
        </section>
    )
}
