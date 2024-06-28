const { useRef, useState, useEffect } = React
import { noteService } from '../../services/note.service.js'

export function NoteCanvas({ addNote, type }) {
    const canvasRef = useRef(null)
    const [drawing, setDrawing] = useState(false)
    const [noteInfo, setNoteInfo] = useState({ title: '' })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
    }, [])

    function handleMouseDown() {
        setDrawing(true)
    }

    function handleMouseUp() {
        setDrawing(false)
    }

    function handleMouseMove(event) {
        if (!drawing) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setNoteInfo(prevNoteInfo => ({ ...prevNoteInfo, [field]: value }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        const canvas = canvasRef.current
        const dataUrl = canvas.toDataURL('image/png')
        const emptyNote = noteService.getEmptyNote()
        const noteToAdd = {
            ...emptyNote,
            info: {
                ...emptyNote.info,
                title: noteInfo.title,
                imgUrl: dataUrl,
            },
            type,
        }
        addNote(noteToAdd)
        setNoteInfo({ title: '' })
        clearCanvas()
    }

    function clearCanvas() {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <div className='note-canvas'>
            <form className='add-canvas flex column justify-center' onSubmit={onAddNote}>
                <input
                    title='add note title'
                    type='text'
                    className='txt-input'
                    name='title'
                    id='title'
                    placeholder='Enter title...'
                    onChange={handleChange}
                    value={noteInfo.title}
                />
                <canvas
                    ref={canvasRef}
                    width='400'
                    height='400'
                    className='canvas'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
                <div className='canvas-controls'>
                    <button type='submit'>Save Note</button>
                    <button type='button' onClick={clearCanvas}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    )
}
