const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'

export function App() {
    return (
        <Router>
            <section className='app'>
                <AppHeader />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/mail' element={<MailIndex />} />

                    <Route path='/note' element={<NoteIndex />} />
                    <Route path='/note/edit/:noteId' element={<NoteEdit />} />
                </Routes>
            </section>
        </Router>
    )
}
