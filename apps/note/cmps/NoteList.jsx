import { NotePreview } from './NotePreview.jsx'
const { Link, useNavigate, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    const navigate = useNavigate()

    function handleArticleClick(noteId) {
        navigate(`/note/edit/${noteId}`)
    }

    return (
        <section className='note-list'>
            {notes.map(note => (
                <article
                    className='note'
                    key={note.id}
                    style={{ backgroundColor: note.style.backgroundColor }}
                    onClick={() => handleArticleClick(note.id)}
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
                </article>
            ))}
        </section>
    )
}
