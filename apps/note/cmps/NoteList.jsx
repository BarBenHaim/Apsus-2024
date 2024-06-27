import { NoteCard } from './NoteCard.jsx'
const { useNavigate, Outlet, useParams } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, loadNotes, onPinChange }) {
    const pinnedNotes = notes.filter(note => note.isPinned === true)
    const nonPinnedNotes = notes.filter(note => note.isPinned !== true)
    if (!notes.length) return <div>No notes found...</div>

    const navigate = useNavigate()
    function handleNoteClick(noteId) {
        navigate(`/note/${noteId}`)
    }

    function handleEditClick(noteId) {
        navigate(`/note/edit/${noteId}`)
    }

    return (
        <section className='note-list'>
            {pinnedNotes.map(note => (
                <NoteCard
                    key={note.id}
                    onRemoveNote={onRemoveNote}
                    handleEditClick={handleEditClick}
                    handleNoteClick={handleNoteClick}
                    note={note}
                    loadNotes={loadNotes}
                    onPinChange={onPinChange}
                />
            ))}
            {nonPinnedNotes.map(note => (
                <NoteCard
                    key={note.id}
                    onRemoveNote={onRemoveNote}
                    handleEditClick={handleEditClick}
                    handleNoteClick={handleNoteClick}
                    note={note}
                    loadNotes={loadNotes}
                    onPinChange={onPinChange}
                />
            ))}
            <Outlet />
        </section>
    )
}
