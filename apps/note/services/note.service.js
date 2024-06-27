import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

_createNotes()

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY).then(notes => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => {
                const textMatch = regex.test(note.info.txt)
                const titleMatch = regex.test(note.info.title)

                if (note.type === 'NoteTodos') {
                    const todoMatch = note.info.todos.some(todo => regex.test(todo.txt))
                    const titleMatch = regex.test(note.info.title)
                    return todoMatch || titleMatch
                }

                return textMatch || titleMatch
            })
        }
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = 'NoteTxt', isPinned = false, createdAt = Date.now(), txt = '') {
    return {
        type,
        isPinned,
        createdAt,
        style: { backgroundColor: '#ffffff' },
        info: { txt },
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createNotes() {
    let notes = localStorageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1622212231,
                type: 'NoteVideo',
                isPinned: true,
                style: { backgroundColor: '#F4B400' },
                info: {
                    title: 'Inspiring Speech',
                    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                },
            },
            {
                id: 'n102',
                createdAt: 1622212232,
                type: 'NoteVideo',
                isPinned: true,
                style: { backgroundColor: '#DB4437' },
                info: {
                    title: 'Tech Talk',
                    youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
                },
            },
            {
                id: 'n103',
                createdAt: 1622212233,
                type: 'NoteImg',
                isPinned: true,
                style: { backgroundColor: '#4285F4' },
                info: {
                    imgUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
                    title: 'Delicious Burger',
                },
            },
            {
                id: 'n104',
                createdAt: 1622212234,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#0F9D58' },
                info: {
                    imgUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
                    title: 'Beautiful Sunset',
                },
            },
            {
                id: 'n105',
                createdAt: 1622212235,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#F4B400' },
                info: { txt: 'Remember to call the doctor.' },
            },
            {
                id: 'n106',
                createdAt: 1622212236,
                type: 'NoteTodos',
                isPinned: true,
                style: { backgroundColor: '#DB4437' },
                info: {
                    title: 'Weekend Tasks',
                    todos: [
                        { txt: 'Clean the house', doneAt: null, id: utilService.makeId() },
                        { txt: 'Buy groceries', doneAt: null, id: utilService.makeId() },
                        { txt: 'Finish the report', doneAt: null, id: utilService.makeId() },
                    ],
                },
            },
            {
                id: 'n107',
                createdAt: 1622212237,
                type: 'NoteVideo',
                isPinned: true,
                style: { backgroundColor: '#4285F4' },
                info: {
                    title: 'My Yoga',
                    youtubeUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
                },
            },
            {
                id: 'n108',
                createdAt: 1622212238,
                type: 'NoteVideo',
                isPinned: false,
                style: { backgroundColor: '#0F9D58' },
                info: {
                    title: 'Travel Vlog',
                    youtubeUrl: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0',
                },
            },
            {
                id: 'n109',
                createdAt: 1622212239,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#F4B400' },
                info: { txt: 'Plan vacation for next month.' },
            },
            {
                id: 'n110',
                createdAt: 1622212240,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#DB4437' },
                info: {
                    imgUrl: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759',
                    title: 'Coding Workspace',
                },
            },
            {
                id: 'n111',
                createdAt: 1622212241,
                type: 'NoteImg',
                isPinned: true,
                style: { backgroundColor: '#4285F4' },
                info: {
                    imgUrl: 'https://unsplash.com/photos/a-red-and-white-motorcycle-parked-on-the-side-of-a-road-r5zfOMZOl9U',
                    title: 'My Motorcycle',
                },
            },
            {
                id: 'n112',
                createdAt: 1622212242,
                type: 'NoteTodos',
                isPinned: true,
                style: { backgroundColor: '#0F9D58' },
                info: {
                    title: 'Daily Routine',
                    todos: [
                        { txt: 'Morning exercise', doneAt: null, id: utilService.makeId() },
                        { txt: 'Breakfast', doneAt: null, id: utilService.makeId() },
                        { txt: 'Work on project', doneAt: null, id: utilService.makeId() },
                    ],
                },
            },
            {
                id: 'n113',
                createdAt: 1622212243,
                type: 'NoteVideo',
                isPinned: false,
                style: { backgroundColor: '#F4B400' },
                info: {
                    title: 'Motivational Video',
                    youtubeUrl: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
                },
            },
            {
                id: 'n114',
                createdAt: 1622212244,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#DB4437' },
                info: { txt: 'Organize my desk.' },
            },
            {
                id: 'n115',
                createdAt: 1622212245,
                type: 'NoteImg',
                isPinned: true,
                style: { backgroundColor: '#4285F4' },
                info: {
                    imgUrl: 'https://images.unsplash.com/photo-1494177310976-837a1d69e4bb',
                    title: 'Sunset Over City',
                },
            },
            {
                id: 'n116',
                createdAt: 1622212246,
                type: 'NoteVideo',
                isPinned: false,
                style: { backgroundColor: '#0F9D58' },
                info: {
                    title: 'Cooking Tips',
                    youtubeUrl: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
                },
            },
            {
                id: 'n117',
                createdAt: 1622212247,
                type: 'NoteTodos',
                isPinned: true,
                style: { backgroundColor: '#F4B400' },
                info: {
                    title: 'Fitness Goals',
                    todos: [
                        { txt: 'Run 5km', doneAt: null, id: utilService.makeId() },
                        { txt: 'Push-ups', doneAt: null, id: utilService.makeId() },
                        { txt: 'Stretching', doneAt: null, id: utilService.makeId() },
                    ],
                },
            },
            {
                id: 'n118',
                createdAt: 1622212248,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#DB4437' },
                info: {
                    imgUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
                    title: 'Beach Vibes',
                },
            },
            {
                id: 'n119',
                createdAt: 1622212249,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#4285F4' },
                info: { txt: 'Meeting at 10 AM on Thursday.' },
            },
            {
                id: 'n120',
                createdAt: 1622212250,
                type: 'NoteVideo',
                isPinned: false,
                style: { backgroundColor: '#0F9D58' },
                info: {
                    title: 'Travel Guide',
                    youtubeUrl: 'https://www.youtube.com/watch?v=K4TOrB7at0Y',
                },
            },
        ]
    }
    localStorageService.saveToStorage(NOTE_KEY, notes)
}

function _createNote(txt) {
    const note = getEmptyNote(txt)
    note.id = utilService.makeId()
    return note
}
