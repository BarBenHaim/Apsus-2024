export function NoteDetails({ note, onClose }) {
    return (
        <div className='note-details-overlay' onClick={onClose}>
            <div className='note-details' onClick={e => e.stopPropagation()}>
                <button className='close-btn' onClick={onClose}>
                    X
                </button>
                <h2>{note.info.title || ''}</h2>
                {note.type === 'NoteImg' && note.info.imgUrl && <img src={note.info.imgUrl} alt='Note Image' />}
                {note.type === 'NoteTxt' && note.info.txt && <p>{note.info.txt}</p>}
                {note.type === 'NoteVideo' && note.info.youtubeUrl && (
                    <iframe
                        width='560'
                        height='315'
                        src={note.info.youtubeUrl.replace('watch?v=', 'embed/')}
                        title='Note Video'
                        frameBorder='0'
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
                <p>{note.isPinned ? 'Pinned' : ''}</p>
            </div>
        </div>
    )
}
