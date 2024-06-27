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

    function onTodoUpdate(noteId, updatedTodos) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
                note.id === noteId ? { ...note, info: { ...note.info, todos: updatedTodos } } : note
            )
            const updatedNote = updatedNotes.find(note => note.id === noteId)
            noteService.save(updatedNote).catch(err => {
                console.log('Problems updating todo status:', err)
                showErrorMsg('Having problems updating todo status!')
            })
            return updatedNotes
        })
    }

    function onPinChange(noteId, isPinned) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note => (note.id === noteId ? { ...note, isPinned } : note))
            const updatedNote = updatedNotes.find(note => note.id === noteId)
            noteService
                .save(updatedNote)

                .catch(err => {
                    console.log('Problems updating pin status:', err)
                    showErrorMsg('Having problems updating pin status!')
                })
            return updatedNotes
        })
    }

    function onBgChange(noteId, color) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
                note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
            )
            const updatedNote = updatedNotes.find(note => note.id === noteId)
            noteService
                .save(updatedNote)
                .then(() => {
                    showSuccessMsg(`Note (${noteId}) background color updated successfully!`)
                })
                .catch(err => {
                    console.log('Problems updating background color:', err)
                    showErrorMsg('Having problems updating background color!')
                })
            return updatedNotes
        })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className='note-index'>
            <NoteFilter />
            <div>
                <NoteSearchFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <NoteAdd addNote={addNote} />
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    loadNotes={loadNotes}
                    onPinChange={onPinChange}
                    onTodoUpdate={onTodoUpdate}
                    onBgChange={onBgChange}
                />
            </div>
            <UserMsg />
        </section>
    )
}
