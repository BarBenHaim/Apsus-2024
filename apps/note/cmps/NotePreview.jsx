const { useState } = React

export function NotePreview({ note, onPinChange, onTodoUpdate, isFromDetails = false }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [todos, setTodos] = useState(note.info.todos || [])

    function handlePinClick(ev) {
        ev.stopPropagation()
        const newIsPinned = !isPinned
        setIsPinned(newIsPinned)
        onPinChange(note.id, newIsPinned)
    }

    function toggleLineThrough(todoId, ev) {
        ev.stopPropagation()
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
            }
            return todo
        })
        setTodos(updatedTodos)
        onTodoUpdate(note.id, updatedTodos)
    }

    return (
        <article className='note-preview'>
            {!isFromDetails ? (
                <img
                    src={isPinned ? '../assets/img/pinFilled.svg' : '../assets/img/pinEmpty.svg'}
                    className='pin-img'
                    onClick={handlePinClick}
                    alt='Pin'
                />
            ) : (
                ''
            )}

            <h2 className='note-title'>{note.info.title || ''}</h2>

            {note.type === 'NoteImg' && note.info.imgUrl && (
                <img src={note.info.imgUrl} alt='Note Image' className='note-img' />
            )}

            {note.type === 'NoteTxt' && note.info.txt && <p className='note-txt'>{note.info.txt}</p>}

            {note.type === 'NoteVideo' && note.info.youtubeUrl && (
                <iframe
                    width='180'
                    height='180'
                    src={note.info.youtubeUrl.replace('watch?v=', 'embed/')}
                    title='Note Video'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    className='note-video'
                ></iframe>
            )}

            {note.type === 'NoteTodos' && todos && (
                <ul className='note-todos'>
                    {todos.map(todo => (
                        <li key={todo.id} onClick={ev => toggleLineThrough(todo.id, ev)}>
                            <span
                                style={{
                                    textDecoration: todo.doneAt ? 'line-through' : 'none',
                                }}
                            >
                                {todo.txt}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {note.type === 'NoteAudio' && note.info.audioUrl && (
                <audio controls className='note-audio'>
                    <source src={note.info.audioUrl} type='audio/mpeg' />
                    Your browser does not support the audio element.
                </audio>
            )}

            {note.type === 'NoteCanvas' && note.info.imgUrl && (
                <img src={note.info.imgUrl} alt='Canvas Note' className='note-canvas' />
            )}
        </article>
    )
}
