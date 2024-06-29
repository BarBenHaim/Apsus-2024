const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React
import { showSuccessMsg, eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { NoteSetFormByType } from './NoteSetFormByType.jsx'

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const editRef = useRef()

    useEffect(() => {
        if (noteId) loadNote()

        const handleClickOutside = event => {
            if (editRef.current && !editRef.current.contains(event.target)) {
                navigate('/note')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [noteId, navigate])

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
        <React.Fragment>
            <div className='backdrop'></div>
            <section
                className='note-edit'
                ref={editRef}
                style={{
                    backgroundColor: noteToEdit.style.backgroundColor,
                }}
            >
                <button className='btn-close-edit' onClick={handleCloseEdit}>
                    x
                </button>
                <NotePreview note={noteToEdit} isFromEdit={true} />
                <form onSubmit={onSaveNote}>
                    <NoteSetFormByType note={noteToEdit} handleChange={handleChange} />
                    {!isLoading ? (
                        <button type='submit' className='btn-edit-submit'>
                            Save Note
                        </button>
                    ) : (
                        <div>Loading...</div>
                    )}
                </form>
            </section>
        </React.Fragment>
    )
}
