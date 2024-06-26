export function MailPreview({ mail, onRemoveMail }) {
  // console.log(mail)

  function getCurrentDate() {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // Month is zero-indexed
    const year = now.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div className="mail-preview">
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
          onClick={() => onRemoveMail(mail.id)}
          className="fa-regular fa-trash-can"
        ></i>
      </section>
    </div>
  )
}
