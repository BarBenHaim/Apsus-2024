export function NoteTodoAdd({ todo, onChange, onRemove, onAdd }) {
    function handleChange(ev) {
        onChange(ev)
    }

    function handleAddTodo() {
        onAdd()
    }

    function handleRemoveTodo() {
        onRemove()
    }

    return (
        <section className='todo-task flex'>
            <button className='add-todo' type='button' onClick={handleAddTodo} title='add another todo'>
                <i className='fa-solid fa-plus'></i>{' '}
            </button>
            <button onClick={handleRemoveTodo} type='button' title='remove todo'>
                <i className='fa-solid fa-trash-can'></i>
            </button>
            <input
                title='add a todo'
                type='text'
                placeholder='Enter todo...'
                name='txt'
                value={todo.txt}
                onChange={handleChange}
            />
        </section>
    )
}
