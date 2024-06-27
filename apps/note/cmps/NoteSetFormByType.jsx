export function NoteSetFormByType({ note, handleChange }) {
    if (!note.type) return null

    switch (note.type) {
        case 'NoteTxt':
            return (
                <div className='text-edit-form'>
                    <label>Text:</label>
                    <input type='text' name='info.txt' value={note.info.txt || ''} onChange={handleChange} />
                </div>
            )
        case 'NoteImg':
            return (
                <div className='img-edit-form'>
                    <label>Image URL:</label>
                    <input type='text' name='info.imgUrl' value={note.info.imgUrl || ''} onChange={handleChange} />
                </div>
            )
        case 'NoteVideo':
            return (
                <div className='video-edit-form'>
                    <label>Title:</label>
                    <input type='text' name='info.title' value={note.info.title || ''} onChange={handleChange} />
                    <label>YouTube URL:</label>
                    <input
                        type='text'
                        name='info.youtubeUrl'
                        value={note.info.youtubeUrl || ''}
                        onChange={handleChange}
                    />
                </div>
            )
        case 'NoteTodos':
            return (
                <div className='todos-edit-form'>
                    <label>Title:</label>
                    <input type='text' name='info.title' value={note.info.title || ''} onChange={handleChange} />
                    <label>Todos:</label>
                    {note.info.todos &&
                        note.info.todos.map((todo, idx) => (
                            <div key={todo.id}>
                                <input
                                    type='text'
                                    name={`info.todos.${idx}.txt`}
                                    value={todo.txt}
                                    onChange={handleChange}
                                />
                                <input
                                    type='checkbox'
                                    name={`info.todos.${idx}.doneAt`}
                                    checked={!!todo.doneAt}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                </div>
            )
        default:
            return null
    }
}
