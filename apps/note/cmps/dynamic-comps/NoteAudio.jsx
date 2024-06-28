import { noteService } from '../../services/note.service.js'

const { useState } = React
export function NoteAudio({ addNote, type }) {
    const [noteInfo, setNoteInfo] = useState({ title: '', audioUrl: '' })

    function handleChange({ target }) {
        const { name: field, value } = target
        setNoteInfo(prevNoteInfo => ({ ...prevNoteInfo, [field]: value }))
    }

    function handleFileChange({ target }) {
        const file = target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = e => {
                setNoteInfo(prevNoteInfo => ({ ...prevNoteInfo, audioUrl: e.target.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    function onAddNote(ev) {
        ev.preventDefault()
        const emptyNote = noteService.getEmptyNote()
        const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, ...noteInfo }, type }
        addNote(noteToAdd)
        setNoteInfo({ title: '', audioUrl: '' })
    }

    return (
        <form className='add-audio flex column justify-center' onSubmit={onAddNote}>
            <input
                title='Add audio note title'
                type='text'
                className='txt-input'
                name='title'
                id='title'
                placeholder='Enter title...'
                onChange={handleChange}
                value={noteInfo.title}
            />
            <label className='btn-add-audio'>
                {' '}
                Add audio
                <input
                    title='Add audio file'
                    type='file'
                    className='audio-input'
                    name='audio'
                    id='audio'
                    accept='audio/*'
                    onChange={handleFileChange}
                />
            </label>
        </form>
    )
}
