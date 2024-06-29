import { MailDetails } from './MailDetails.jsx'
import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onRemoveMail, onStar }) {
  const isRead = mail.isRead
  return (
    <div>
      <div className={`mail-preview ${!isRead ? 'unread' : ''}`}>
        <p>
          <span>
            <i
              onClick={(ev) => onStar(ev, mail.id)}
              className={`fa-star ${
                mail.isStarred ? 'fa-solid star-yellow' : 'fa-regular'
              }`}
            ></i>
          </span>
          {mail.from}
        </p>
        <p>{mail.subject}</p>
        <p className="time">{mailService.getRelativeTime(mail.createdAt)}</p>
        <section className="preview-btn">
          <i className="fa-regular fa-share-from-square"></i>
          <i className="fa-regular fa-envelope-open"></i>

          <i
            onClick={(ev) => onRemoveMail(ev, mail.id)}
            className="fa-regular fa-trash-can stat-icon"
          ></i>
        </section>
      </div>
    </div>
  )
}
