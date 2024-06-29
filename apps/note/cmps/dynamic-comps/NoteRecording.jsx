const { useState, useRef } = React
import { noteService } from '../../services/note.service.js'

export function NoteRecording({ addNote }) {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const mediaRecorder = useRef(null)
    const audioChunks = useRef([])

    function startRecording() {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream)
                mediaRecorder.current.ondataavailable = event => {
                    audioChunks.current.push(event.data)
                }
                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(audioChunks.current, { type: 'audio/wav' })
                    setAudioBlob(blob)
                    audioChunks.current = []
                }
                mediaRecorder.current.start()
                setIsRecording(true)
            })
            .catch(error => {
                console.error('Error accessing audio devices.', error)
            })
    }

    function stopRecording() {
        mediaRecorder.current.stop()
        setIsRecording(false)
    }

    function saveRecording() {
        const emptyNote = noteService.getEmptyNote()
        const audioUrl = URL.createObjectURL(audioBlob)
        const noteToAdd = { ...emptyNote, info: { ...emptyNote.info, audioUrl }, type: 'NoteRecording' }
        addNote(noteToAdd)
        setAudioBlob(null)
    }

    return (
        <div className='note-recording'>
            <div className='controls'>
                {!isRecording && <button onClick={startRecording}>Start Recording</button>}
                {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
            </div>
            {audioBlob && (
                <div className='playback'>
                    <audio controls src={URL.createObjectURL(audioBlob)}></audio>
                    <button onClick={saveRecording}>Save Recording</button>
                </div>
            )}
        </div>
    )
}
