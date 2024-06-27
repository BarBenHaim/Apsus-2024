import { MailDetails } from './MailDetails.jsx'

export function MailPreview({ mail, onRemoveMail }) {
  function getCurrentDate() {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // Month is zero-indexed
    const year = now.getFullYear()
    return `${day}/${month}/${year}`
  }
  const isRead = mail.isRead
  return (
    <div>
      <div className={`mail-preview ${!isRead ? 'unread' : ''}`}>
        <p>
          <span>
            <i className="fa-regular fa-star"></i>{' '}
          </span>
          {mail.from}
        </p>
        <p>{mail.subject}</p>
        <p>{getCurrentDate()}</p>
        <section>
          <i
            onClick={(ev) => onRemoveMail(ev, mail.id)}
            className="fa-regular fa-trash-can"
          ></i>
        </section>
      </div>
      {/* <MailDetails mail={mail} /> */}
    </div>
  )
}
