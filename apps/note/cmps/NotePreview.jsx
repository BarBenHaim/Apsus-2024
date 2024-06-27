const { useState, useEffect } = React

export function NotePreview({ note, onPinChange }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    function handlePinClick(ev) {
        ev.stopPropagation()
        const newIsPinned = !isPinned
        setIsPinned(newIsPinned)
        onPinChange(note.id, newIsPinned)
    }

    return (
        <article className='note-preview'>
            <img
                src={isPinned ? '../assets/img/pinFilled.svg' : '../assets/img/pinEmpty.svg'}
                className='pin-img'
                onClick={handlePinClick}
            ></img>

            <h2 className='note-title'>{note.info.title || ''}</h2>
            {note.type === 'NoteImg' && note.info.imgUrl && <img src={note.info.imgUrl} alt='Note Image' />}
            {note.type === 'NoteTxt' && note.info.txt && <p>{note.info.txt}</p>}
            {note.type === 'NoteVideo' && note.info.youtubeUrl && (
                <iframe
                    width='180'
                    height='180'
                    src={note.info.youtubeUrl.replace('watch?v=', 'embed/')}
                    title='Note Video'
                    border='none'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            )}

            {note.type === 'NoteTodos' && note.info.todos && (
                <ul>
                    {note.info.todos.map(todo => (
                        <li key={todo.id}>
                            <span>{todo.txt}</span> {todo.doneAt ? '✔' : '❌'}
                        </li>
                    ))}
                </ul>
            )}
            <p>Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
        </article>
    )
}
