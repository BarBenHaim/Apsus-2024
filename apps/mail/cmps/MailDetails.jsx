// import { mailService } from '../services/mail.service.js'

// const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouterDOM

// export function MailDetails() {
//   const [mail, setMail] = useState(null)
//   const navigate = useNavigate()
//   const params = useParams()

//   useEffect(() => {
//     loadMail()
//   }, [params.mailId])

//   function loadMail() {
//     mailService
//       .get(params.mailId)
//       .then(setMail)
//       .catch((err) => {
//         console.error('err:', err)
//         showErrorMsg('Cannot load Mail')
//         navigate('/mail')
//       })
//   }
//   function onCloseMail() {
//     navigate('/mail')
//   }
//   if (!mail) return <div>Loading...</div>
//   return (
//     <section className="mail-details">
//       <h1>{mail.from}</h1>
//       <p>{mail.subject}</p>
//       <p>{mail.body}</p>
//       <p>{mail.createdAt}</p>
//       <button onClick={onCloseMail()}>X</button>
//     </section>
//   )
// }
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

  function onCloseMail() {
    navigate('/mail')
  }

  if (!mail) return <div>Loading...</div>

  return (
    <section className="mail-details">
      <div className="mail-header">
        <h1>{mail.from}</h1>
        <button className="close-button" onClick={onCloseMail}>
          X
        </button>
      </div>
      <div className="mail-content">
        <p className="mail-subject">{mail.subject}</p>
        <p className="mail-body">{mail.body}</p>
        <p className="mail-date">{new Date(mail.createdAt).toLocaleString()}</p>
      </div>
    </section>
  )
}
