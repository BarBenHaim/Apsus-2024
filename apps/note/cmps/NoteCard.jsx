import { NotePreview } from './NotePreview.jsx'

export function NoteCard({ note, onRemoveNote, handleEditClick, handleNoteClick, onPinChange }) {
    return (
        <article
            className='note-card'
            onClick={() => handleNoteClick(note.id)}
            key={note.id}
            style={{ backgroundColor: note.style.backgroundColor }}
        >
            <NotePreview note={note} onPinChange={onPinChange} />
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
    )
}
