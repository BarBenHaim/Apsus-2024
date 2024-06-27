import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'

import { mailService } from '../services/mail.service.js'
import { MailFolder } from '../cmps/MailFolderList.jsx'
const { useParams, useNavigate, Outlet } = ReactRouterDOM

const { useState, useEffect } = React
export function MailIndex() {
  const params = useParams()
  const [mails, setMails] = useState(null)

  const mailId = params.mailId
  useEffect(() => {
    console.log(mails)

    mailService.query().then((mails) => {
      setMails(mails)
      // console.log(mails)
    })
  }, [])

  function onRemoveMail(ev, mailId) {
    ev.preventDefault()
    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMail) => prevMail.filter((mail) => mail.id !== mailId))
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }
  function onRead(mailId) {
    mails.map((mail) => {
      if (mail.id === mailId) {
        mail.isRead = true
      }
      console.log(mail.isRead)

      return mails
    })
  }

  if (!mails) return <div>Loading...</div>
  return (
    <section className="mail-layout">
      <MailFilter />
      <MailFolder />

      {!mailId && (
        <MailList mails={mails} onRemoveMail={onRemoveMail} onRead={onRead} />
      )}
      {mailId && <Outlet />}
    </section>
  )
}
