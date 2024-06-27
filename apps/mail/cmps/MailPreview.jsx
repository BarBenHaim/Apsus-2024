import { MailDetails } from './MailDetails.jsx'

export function MailPreview({ mail, onRemoveMail, onStar }) {
  function getRelativeTime(date) {
    const now = new Date()
    const diff = now - new Date(date) // Difference in milliseconds

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 5) {
      const dateObj = new Date(date)
      const day = dateObj.getDate().toString().padStart(2, '0')
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
      const year = dateObj.getFullYear()
      return `${day}/${month}/${year}`
    }

    if (days < 1) {
      const dateObj = new Date(date)
      const hours = dateObj.getHours().toString().padStart(2, '0')
      const minutes = dateObj.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    }

    if (seconds < 60) return `${seconds} seconds ago`
    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }
  const isRead = mail.isRead
  return (
    <div>
      <div className={`mail-preview ${!isRead ? 'unread' : ''}`}>
        <p>
          <span>
            <i
              onClick={(ev) => onStar(ev, mail.id)}
              className={`fa-star ${
                mail.isStar ? 'fa-solid star-yellow' : 'fa-regular'
              }`}
            ></i>
          </span>
          {mail.from}
        </p>
        <p>{mail.subject}</p>
        <p className="time">{getRelativeTime(mail.createdAt)}</p>
        <section className="preview-btn">
          <i className="fa-regular fa-share-from-square"></i>
          <i className="fa-regular fa-envelope-open"></i>
          <i
            onClick={(ev) => onRemoveMail(ev, mail.id)}
            className="fa-regular fa-trash-can"
          ></i>
        </section>
      </div>
    </div>
  )
}
