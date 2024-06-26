import { NoteTxt } from './dynamic-comps/NoteTxt.jsx'
import { NoteImg } from './dynamic-comps/NoteImg.jsx'
import { NoteVideo } from './dynamic-comps/NoteVideo.jsx'
import { NoteTodos } from './dynamic-comps/NoteTodos.jsx'

export function NoteSetType({ addNote, type }) {
    switch (type) {
        case 'NoteTxt':
            return <NoteTxt addNote={addNote} type={type} />
        case 'NoteImg':
            return <NoteImg addNote={addNote} type={type} />
        case 'NoteVideo':
            return <NoteVideo addNote={addNote} type={type} />
        case 'NoteTodos':
            return <NoteTodos addNote={addNote} type={type} />
    }
}
