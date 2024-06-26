import { noteService } from '../../services/note.service.js'

const { useState } = React

export function NoteVideo({ addNote, type }) {
    const [noteInfo, setNoteInfo] = useState({
        title: '',
        youtubeUrl: '',
    })
    function onAddNote(ev) {
        ev.preventDefault()
        const emptyNote = noteService.getEmptyNote()
        const noteToAdd = {
            ...emptyNote,
            info: { ...emptyNote.info, ...noteInfo },
            type,
        }
        addNote(noteToAdd)
        setNoteInfo({ title: '', youtubeUrl: '' })
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setNoteInfo({ ...noteInfo, [field]: value })
    }

    return (
        <React.Fragment>
            <form className='flex column' onSubmit={onAddNote}>
                <input
                    title='add note title'
                    className='title-input'
                    onChange={handleChange}
                    type='text'
                    placeholder='Enter title...'
                    name='title'
                    id='title'
                    value={noteInfo.title}
                />
                <input
                    required
                    title='add note youtube url'
                    onChange={handleChange}
                    type='text'
                    className='youtubeUrl'
                    placeholder='Enter  youtube url...'
                    name='youtubeUrl'
                    id='youtubeUrl'
                    value={noteInfo.youtubeUrl}
                />
                <button hidden type='submit'>
                    +
                </button>
            </form>
        </React.Fragment>
    )
}
