import { ColorPicker } from './ColorPicker.jsx'
import { NotePreview } from './NotePreview.jsx'

const { Link } = ReactRouterDOM
const { useState } = React

export function NoteCard({
    note,
    onRemoveNote,
    handleEditClick,
    handleNoteClick,
    onPinChange,
    onTodoUpdate,
    onBgChange,
    duplicateNote,
}) {
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)

    function handleColorSelect(color) {
        onBgChange(note.id, color)
        setIsColorPickerVisible(false)
    }

    function handleLinkClick(ev) {
        ev.stopPropagation()
    }

    function getMailComposeUrl(note) {
        let subject = 'No Subject'
        let body = 'No Content'

        if (note.type === 'NoteTxt') {
            subject = note.info.title || 'No Subject'
            body = note.info.txt || 'No Content'
        } else if (note.type === 'NoteTodos') {
            subject = note.info.title || 'No Subject'
            body = note.info.todos.map(todo => todo.txt).join(', ') || 'No Content'
        } else if (note.type === 'NoteImg') {
            subject = note.info.title || 'No Subject'
            body = note.info.imgUrl || 'No Content'
        } else if (note.type === 'NoteVideo') {
            subject = note.info.title || 'No Subject'
            body = note.info.youtubeUrl || 'No Content'
        }

        return `/mail?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    return (
        <article
            className='note-card'
            onClick={note.type !== 'NoteLocation' ? () => handleNoteClick(note.id) : undefined}
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
            {note.type !== 'NoteAudio' && note.type !== 'NoteCanvas' && note.type !== 'NoteLocation' && (
                <button
                    className='btn-action'
                    onClick={e => {
                        e.stopPropagation()
                        handleEditClick(note.id)
                    }}
                >
                    <i className='fa-solid fa-pen-to-square'></i>
                </button>
            )}
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    setIsColorPickerVisible(!isColorPickerVisible)
                }}
            >
                <i className='fa-solid fa-palette'></i>
            </button>
            <button
                className='btn-action'
                onClick={e => {
                    e.stopPropagation()
                    duplicateNote(note.id)
                }}
            >
                <i className='fa-solid fa-copy'></i>
            </button>
            {isColorPickerVisible && <ColorPicker onColorSelect={handleColorSelect} />}
            <button className='btn-action'>
                <Link
                    to={getMailComposeUrl(note)}
                    className='note-mail-btn fa-solid fa-paper-plane'
                    onClick={handleLinkClick}
                ></Link>
            </button>
        </article>
    )
}
