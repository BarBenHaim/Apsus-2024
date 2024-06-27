import { NotePreview } from './NotePreview.jsx'
const { Link, useNavigate, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    const navigate = useNavigate()

    function handleNoteClick(noteId) {
        navigate(`/note/${noteId}`)
    }

    function handleEditClick(noteId) {
        navigate(`/note/edit/${noteId}`)
    }

    return (
        <section className='note-list'>
            {notes.map(note => (
                <article
                    className='note'
                    key={note.id}
                    style={{ backgroundColor: note.style.backgroundColor }}
                    onClick={() => handleNoteClick(note.id)}
                >
                    <NotePreview note={note} />
                    <button
                        onClick={e => {
                            e.stopPropagation()
                            onRemoveNote(note.id)
                        }}
                    >
                        Remove
                    </button>
                    <button
                        onClick={e => {
                            e.stopPropagation()
                            handleEditClick(note.id)
                        }}
                    >
                        Edit
                    </button>
                </article>
            ))}
            <Outlet />
        </section>
    )
}
