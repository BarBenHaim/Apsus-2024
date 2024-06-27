import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteSearchFilter } from '../cmps/NoteSearchFilter.jsx'
import { noteService } from '../services/note.service.js'

const { useEffect, useState } = React
export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function onSetFilterBy(txt) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...txt }))
    }

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
    }

    function addNote(note) {
        noteService
            .save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg('Note added successfully')
            })
            .catch(err => {
                showErrorMsg('Could not add note')
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
                showErrorMsg('Having problems removing Note!')
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            <NoteFilter />

            <div>
                <NoteSearchFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <NoteAdd addNote={addNote} />
                <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            </div>
            <UserMsg />
        </section>
    )
}
