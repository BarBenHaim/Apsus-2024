import { MailPreview } from './MailPreview.jsx'
const { useParams, useNavigate, Link } = ReactRouterDOM
export function MailList({ mails, onRemoveMail, onRead }) {
  return (
    <ul className="list-container">
      {mails.map((mail) => (
        <li key={mail.id}>
          <Link to={`/mail/${mail.id}`} onClick={() => onRead(mail.id)}>
            <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
