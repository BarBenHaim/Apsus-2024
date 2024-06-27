import { NoteCard } from './NoteCard.jsx'
const { useNavigate, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, loadNotes, onPinChange, onTodoUpdate, onBgChange, duplicateNote }) {
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
        <React.Fragment>
            <h2 className='pinned-notes-title notes-title'>Pinned Notes</h2>
            <section className='pinned-note-list note-list no-notes'>
                {pinnedNotes.length ? (
                    pinnedNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            onRemoveNote={onRemoveNote}
                            handleEditClick={handleEditClick}
                            handleNoteClick={handleNoteClick}
                            note={note}
                            loadNotes={loadNotes}
                            onPinChange={onPinChange}
                            onTodoUpdate={onTodoUpdate}
                            onBgChange={onBgChange}
                            duplicateNote={duplicateNote}
                        />
                    ))
                ) : (
                    <div className='no-notes'>No pinned notes yet...</div>
                )}
            </section>
            <h2 className='unpinned-notes-title notes-title'>Notes</h2>
            <section className='unpinned-note-list note-list'>
                {nonPinnedNotes.length ? (
                    nonPinnedNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            onRemoveNote={onRemoveNote}
                            handleEditClick={handleEditClick}
                            handleNoteClick={handleNoteClick}
                            note={note}
                            loadNotes={loadNotes}
                            onPinChange={onPinChange}
                            onTodoUpdate={onTodoUpdate}
                            onBgChange={onBgChange}
                            duplicateNote={duplicateNote}
                        />
                    ))
                ) : (
                    <div className='no-notes'>No notes yet...</div>
                )}
            </section>
            <Outlet />
        </React.Fragment>
    )
}
