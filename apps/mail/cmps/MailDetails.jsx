import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    loadMail()
  }, [params.mailId])

  function loadMail() {
    mailService
      .get(params.mailId)
      .then(setMail)
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load Mail')
        navigate('/mail')
      })
  }
  if (!mail) return <div>Loading...</div>
  return (
    <section className="mail-details">
      <h1>{mail.from}</h1>
      <p>{mail.subject}</p>
      <p>{mail.body}</p>
      <p>{mail.sentAt}</p>
    </section>
  )
}
