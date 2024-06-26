const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'

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
