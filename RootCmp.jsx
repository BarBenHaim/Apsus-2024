const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteDetails } from './apps/note/cmps/NoteDetails.jsx'
import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Footer } from './cmps/Footer.jsx'
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

                    <Route path='/mail' element={<MailIndex />}>
                        <Route path='/mail/:mailId' element={<MailDetails />} />
                    </Route>

                    <Route path='/note' element={<NoteIndex />}>
                        <Route path='/note/edit/:noteId' element={<NoteEdit />} />
                        <Route path='/note/:noteId' element={<NoteDetails />} />
                    </Route>

                    <Route path='/book' element={<BookIndex />} />
                    <Route path='/book/edit' element={<BookEdit />} />
                    <Route path='/book/edit/:bookId' element={<BookEdit />} />
                    <Route path='/book/:bookId' element={<BookDetails />} />
                </Routes>
            </section>
            <Footer />
        </Router>
    )
}
