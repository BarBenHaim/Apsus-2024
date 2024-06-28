const { useState } = React

export function NotePreview({ note, onPinChange, onTodoUpdate }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [todos, setTodos] = useState(note.info.todos)

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
            <img
                src={isPinned ? '../assets/img/pinFilled.svg' : '../assets/img/pinEmpty.svg'}
                className='pin-img'
                onClick={handlePinClick}
            />

            <h2 className='note-title'>{note.info.title || ''}</h2>
            {note.type === 'NoteImg' && note.info.imgUrl && <img src={note.info.imgUrl} alt='Note Image' />}
            {note.type === 'NoteTxt' && note.info.txt && <p>{note.info.txt}</p>}
            {note.type === 'NoteVideo' && note.info.youtubeUrl && (
                <iframe
                    width='180'
                    height='180'
                    src={note.info.youtubeUrl.replace('watch?v=', 'embed/')}
                    title='Note Video'
                    frameBorder='none'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            )}
            {note.type === 'NoteTodos' && todos && (
                <ul>
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
        </article>
    )
}
