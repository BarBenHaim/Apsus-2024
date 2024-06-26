import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailDetails } from './MailDetails.jsx'

import { mailService } from '../services/mail.service.js'
import { MailFolder } from '../cmps/MailFolderList.jsx'

const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    mailService.query().then((mails) => {
      setMails(mails)
      console.log(mails)
    })
  }, [])

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMail) => prevMail.filter((mail) => mail.id !== mailId))
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  if (!mails) return <div>Loading...</div>
  return (
    <section className="mail-layout">
      <MailFilter />
      <MailFolder />
      <MailList mails={mails} onRemoveMail={onRemoveMail} onRead={onRead} />
    </section>
  )
}
