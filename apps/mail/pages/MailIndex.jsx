import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailModal } from '../cmps/MailModal.jsx'
import { MailFolder } from '../cmps/MailFolderList.jsx'

import { mailService } from '../services/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

const { useParams, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

const loggedinUser = {
    email: 'fakironir@gmail.com',
    fullname: 'Mahatma Appsus',
}

export function MailIndex() {
    const params = useParams()
    const [mails, setMails] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(null)
    const [filterbyFolder, setFilterByFolder] = useState(null)

    const [filterBy, setFilterBy] = useState({ from: '' })
    const mailId = params.mailId

    useEffect(() => {
        const unsubscribe = eventBusService.on('open-compose', () => {
            onOpenCompose()
        })
        return () => {
            unsubscribe
        }
    }, [])

    useEffect(() => {
        mailService.query(filterBy).then(mails => {
            setMails(mails)
            setFilterByFolder(mails)

            const inboxMails = mails.filter(mail => mail.from !== loggedinUser.email)
            setFilterByFolder(inboxMails)
            setSelectedFloder(true)
        })
    }, [filterBy])

    function onCompose(to, subject, message) {
        mailService.createNewMail(to, subject, message).then(newMails => {
            setMails(newMails)
            setFilterByFolder(newMails.filter(mail => mail.from !== loggedinUser.email))
            closeModal()
        })
    }

    function getInbox() {
        const inboxMails = mails.filter(mail => mail.from !== loggedinUser.email)
        setFilterByFolder(inboxMails)

        return inboxMails
    }

    function getSentMails() {
        const sentMails = mails.filter(mail => mail.from === loggedinUser.email)
        setFilterByFolder(sentMails)

        return sentMails
    }

    function getStarredMails() {
        const starMails = mails.filter(mail => mail.isStarred)
        setFilterByFolder(starMails)
        return starMails
    }

    function onStar(ev, mailId) {
        ev.preventDefault()
        const updatedMails = mails.map(mail => (mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail))
        // setFilterByFolder(updatedMails)
        setMails(updatedMails)
        mailService.save(updatedMails)
    }

    function onRemoveMail(ev, mailId) {
        ev.preventDefault()
        mailService
            .remove(mailId)
            .then(() => {
                setFilterByFolder(prevMail => prevMail.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRead(mailId) {
        mails.map(mail => {
            if (mail.id === mailId) {
                mail.isRead = true
            }
            return mails
        })
    }

    function onOpenCompose() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function toggleFolder() {
        console.log('fi')

        setIsFolderOpen(!isFolderOpen)
    }

    if (!mails) return <img src='assets/loader/loader.svg' className='loader' />
    return (
        <section className='mail-layout'>
            <MailFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />

            <MailFolder
                mails={mails}
                onOpenCompose={onOpenCompose}
                getSentMails={getSentMails}
                getInbox={getInbox}
                getStarredMails={getStarredMails}
            />

            {!mailId && <MailList mails={filterbyFolder} onRemoveMail={onRemoveMail} onRead={onRead} onStar={onStar} />}
            {mailId && <Outlet />}
            {isModalOpen && <MailModal closeModal={closeModal} onCompose={onCompose} onOpenCompose={onOpenCompose} />}
        </section>
    )
}
