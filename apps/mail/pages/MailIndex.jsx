import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailDetails } from './MailDetails.jsx'

import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    mailService.query().then((mails) => {
      setMails(mails)
      console.log(mails)
    })
  }, [])

  if (!mails) return <div>Loading...</div>
  return (
    <section>
      <MailList mails={mails} />
    </section>
  )
}
