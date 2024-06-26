export function NotePreview({ note }) {
    return (
        <article className='note-preview'>
            <h2>{note.title ? note.title : note.info.title}</h2>
            <p>{note.info.txt}</p>
            <p>Created at: {note.createdAt}</p>
            <p>{note.isPinned ? 'pinned' : ''}</p>
        </article>
    )
}
