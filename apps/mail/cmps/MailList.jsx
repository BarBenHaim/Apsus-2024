import { MailPreview } from './MailPreview.jsx'
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onRead, onStar }) {
  return (
    <ul className="list-container">
      {mails.map((mail) => (
        <li key={mail.id}>
          <Link to={`/mail/${mail.id}`} onClick={() => onRead(mail.id)}>
            <MailPreview
              mail={mail}
              onRemoveMail={onRemoveMail}
              onStar={onStar}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
