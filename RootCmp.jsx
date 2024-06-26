const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteDetails } from './apps/note/cmps/NoteDetails.jsx'
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
                    <Route path='/mail/:mailId' element={<MailDetails />} />
                    <Route path='/note' element={<NoteIndex />}>
                        <Route path='/note/edit/:noteId' element={<NoteEdit />} />
                        <Route path='/note/:noteId' element={<NoteDetails />} />
                    </Route>
                </Routes>
            </section>
        </Router>
    )
}
