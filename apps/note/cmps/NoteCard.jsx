import { ColorPicker } from './ColorPicker.jsx'
import { NotePreview } from './NotePreview.jsx'

const { useState } = React

export function NoteCard({
    note,
    onRemoveNote,
    handleEditClick,
    handleNoteClick,
    onPinChange,
    onTodoUpdate,
    onBgChange,
}) {
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)

    function handleColorSelect(color) {
        onBgChange(note.id, color)
        setIsColorPickerVisible(false)
    }

    return (
        <article
            className='note-card'
            onClick={() => handleNoteClick(note.id)}
            key={note.id}
            style={{ backgroundColor: note.style.backgroundColor }}
        >
            <NotePreview note={note} onPinChange={onPinChange} onTodoUpdate={onTodoUpdate} />
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    onRemoveNote(note.id)
                }}
            >
                <i className='fa-solid fa-trash-can'></i>
            </button>
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    handleEditClick(note.id)
                }}
            >
                <i className='fa-solid fa-pen-to-square'></i>
            </button>
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    setIsColorPickerVisible(!isColorPickerVisible)
                }}
            >
                <i className='fa-solid fa-palette'></i>
            </button>
            {isColorPickerVisible && <ColorPicker onColorSelect={handleColorSelect} />}
        </article>
    )
}
