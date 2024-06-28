import { NoteSetType } from './NoteSetType.jsx'

const { useState } = React

export function NoteAdd({ addNote }) {
    const [noteType, setNoteType] = useState('NoteTxt')

    const typeBtns = [
        {
            type: 'NoteImg',
            placeholder: 'Add Image url...',
            icon: <i className='fa-regular fa-image'></i>,
        },
        {
            type: 'NoteTxt',
            placeholder: 'Add Note...',
            icon: <i className='fa-regular fa-message'></i>,
        },
        {
            type: 'NoteVideo',
            placeholder: 'Add Video url...',
            icon: <i className='fa-brands fa-youtube'></i>,
        },
        {
            type: 'NoteTodos',
            placeholder: 'Add Todos...',
            icon: <i className='fa-solid fa-list'></i>,
        },
        {
            type: 'NoteAudio',
            placeholder: 'Add Audio...',
            icon: <i className='fa-solid fa-music'></i>,
        },
    ]

    function onSetNoteType(type) {
        setNoteType(type)
    }

    return (
        <section className='note-add animate__animated animate__fadeInLeft'>
            {noteType && (
                <React.Fragment>
                    <NoteSetType addNote={addNote} type={noteType} />
                    <section className='note-type-btns'>
                        {typeBtns.map((btn, idx) => (
                            <button
                                title={`Enter ${btn.type.slice(4)}`}
                                key={idx}
                                type='button'
                                onClick={() => onSetNoteType(btn.type)}
                            >
                                {btn.icon}
                            </button>
                        ))}
                    </section>
                </React.Fragment>
            )}
        </section>
    )
}
