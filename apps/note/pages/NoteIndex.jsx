import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { useEffect, useState } = React
export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    function addNote(note) {
        noteService
            .save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg(`Note added successfully`)
            })
            .catch(err => {
                showErrorMsg(`Could not add note`)
            })
    }

    function onRemoveNote(noteId) {
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Having problems removing Note!`)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            <NoteFilter />
            <div>
                <NoteAdd addNote={addNote} />
                <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            </div>
            <UserMsg />
        </section>
    )
}
