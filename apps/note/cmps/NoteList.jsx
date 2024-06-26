import { NotePreview } from './NotePreview.jsx'
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return (
        <section className='note-list'>
            {notes.map(note => (
                <article className='note' key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} />
                    <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                    <button>
                        <Link to={`/note/${note.id}`}>Details</Link>
                    </button>
                    <button>
                        <Link to={`/note/edit/${note.id}`}>Edit</Link>
                    </button>
                </article>
            ))}
        </section>
    )
}
