import { ColorPicker } from './ColorPicker.jsx'
import { NotePreview } from './NotePreview.jsx'

const { useState } = React

export function NoteCard({ note, onRemoveNote, handleEditClick, handleNoteClick, onPinChange, onBgChange }) {
    const [colorPickerNoteId, setColorPickerNoteId] = useState(null)

    return (
        <article
            className='note-card'
            onClick={() => handleNoteClick(note.id)}
            key={note.id}
            style={{ backgroundColor: note.style.backgroundColor }}
        >
            <NotePreview note={note} onPinChange={onPinChange} />
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    onRemoveNote(note.id)
                }}
            >
                <i class='fa-solid fa-trash-can'></i>
            </button>
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    handleEditClick(note.id)
                }}
            >
                <i class='fa-solid fa-pen-to-square'></i>
            </button>
            <button className='btn-action' onClick={() => console.log(note.id)}>
                <i class='fa-solid fa-palette'></i>
            </button>

            {colorPickerNoteId == note.id && <ColorPicker onChangeColor={color => onBgChange(note.id, color)} />}
        </article>
    )
}
