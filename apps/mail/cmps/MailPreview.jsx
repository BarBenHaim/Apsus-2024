export function MailPreview({ mail }) {
  // console.log(mail)

  return (
    <div className="mail-preview">
      <p>{mail.from}</p>

      <p>{mail.subject}</p>
    </div>
  )
}
