const { useState } = React

import { utilService } from '../../../../services/util.service.js'
import { noteService } from '../../services/note.service.js'
import { NoteTodoAdd } from './NoteTodoAdd.jsx'

export function NoteTodos({ addNote, type }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [todos, setTodos] = useState([
        {
            id: utilService.makeId(),
            txt: '',
            doneAt: null,
        },
    ])

    function handleTitleChange({ target }) {
        const { value } = target
        setNoteTitle(value)
    }

    function handleTodoChange({ target }, { id }) {
        const { name: field, value } = target
        setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, [field]: value } : todo)))
    }

    function addTodo() {
        const emptyTodo = {
            id: utilService.makeId(),
            txt: '',
            doneAt: null,
        }
        setTodos(prevTodos => [...prevTodos, emptyTodo])
    }

    function removeTodo({ id }) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        const emptyNote = noteService.getEmptyNote()
        const noteToAdd = {
            ...emptyNote,
            info: { ...emptyNote.info, title: noteTitle, todos },
            type,
        }
        addNote(noteToAdd)
        setNoteTitle('')
        setTodos([
            {
                id: utilService.makeId(),
                txt: '',
                doneAt: null,
            },
        ])
    }

    return (
        <React.Fragment>
            <form className='flex column' onSubmit={onAddNote}>
                <input
                    required
                    title='add note title'
                    className='title-input'
                    onChange={handleTitleChange}
                    type='text'
                    placeholder='Enter title...'
                    name='title'
                    id='title'
                    value={noteTitle}
                />

                {todos.map(todo => (
                    <NoteTodoAdd
                        key={todo.id}
                        todo={todo}
                        onChange={ev => handleTodoChange(ev, todo)}
                        onRemove={() => removeTodo(todo)}
                        onAdd={addTodo}
                    />
                ))}

                <button hidden type='submit'>
                    +
                </button>
            </form>
        </React.Fragment>
    )
}
