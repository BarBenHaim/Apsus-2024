import { NoteTxt } from './dynamic-comps/NoteTxt.jsx'
import { NoteImg } from './dynamic-comps/NoteImg.jsx'
import { NoteVideo } from './dynamic-comps/NoteVideo.jsx'
import { NoteTodos } from './dynamic-comps/NoteTodos.jsx'
import { NoteAudio } from './dynamic-comps/NoteAudio.jsx'
import { NoteCanvas } from './dynamic-comps/NoteCanvas.jsx'

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
        case 'NoteAudio':
            return <NoteAudio addNote={addNote} type={type} />
        case 'NoteCanvas':
            return <NoteCanvas addNote={addNote} type={type} />
    }
}
