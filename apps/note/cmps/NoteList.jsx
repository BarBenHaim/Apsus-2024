import { NoteCard } from './NoteCard.jsx'
const { useNavigate, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, loadNotes, onPinChange, onBgChange }) {
    const pinnedNotes = notes.filter(note => note.isPinned === true)
    const nonPinnedNotes = notes.filter(note => note.isPinned !== true)

    const navigate = useNavigate()

    if (!notes.length) return <div>No notes found...</div>

    function handleNoteClick(noteId) {
        navigate(`/note/${noteId}`)
    }

    function handleEditClick(noteId) {
        navigate(`/note/edit/${noteId}`)
    }

    return (
        <section className='note-list'>
            {pinnedNotes.map(note => {
                return (
                    <NoteCard
                        key={note.id}
                        onRemoveNote={onRemoveNote}
                        handleEditClick={handleEditClick}
                        handleNoteClick={handleNoteClick}
                        note={note}
                        loadNotes={loadNotes}
                        onPinChange={onPinChange}
                        onBgChange={onBgChange}
                    />
                )
            })}

            {nonPinnedNotes.map(note => {
                return (
                    <NoteCard
                        key={note.id}
                        onRemoveNote={onRemoveNote}
                        handleEditClick={handleEditClick}
                        handleNoteClick={handleNoteClick}
                        note={note}
                        loadNotes={loadNotes}
                        onPinChange={onPinChange}
                        onBgChange={onBgChange}
                    />
                )
            })}

            <Outlet />
        </section>
    )
}
