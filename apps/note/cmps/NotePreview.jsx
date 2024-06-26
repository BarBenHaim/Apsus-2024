const { useState } = React

export function NotePreview({ note }) {
    return (
        <article className='note-preview'>
            <img
                src={note.isPinned ? '../assets/img/pinFilled.svg' : '../assets/img/pinEmpty.svg'}
                className='pin-img'
            ></img>

            <h2>{note.info.title || ''}</h2>
            {note.type === 'NoteImg' && note.info.imgUrl && <img src={note.info.imgUrl} alt='Note Image' />}
            {note.type === 'NoteTxt' && note.info.txt && <p>{note.info.txt}</p>}
            {note.type === 'NoteVideo' && note.info.youtubeUrl && (
                <iframe
                    width='150'
                    height='150'
                    src={note.info.youtubeUrl.replace('watch?v=', 'embed/')}
                    title='Note Video'
                    frameBorder='0'
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
