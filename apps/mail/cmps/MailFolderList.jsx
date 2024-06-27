export function MailFolder({
  onNewMail,
  mails,
  filretSentMails,
  getInbox,
  filterStarMails,
}) {
  return (
    <section className="folder-container">
      <h1> folder</h1>

      <div className="btn-container">
        <button onClick={onNewMail} className="compose-btn">
          <i className="fa-solid fa-pencil"></i>New mail
        </button>
      </div>

      <section className="folder-item">
        <div onClick={() => getInbox()}>
          <i className="fa-solid fa-inbox"></i>Inboxes
          <p>{mails.length}</p>
        </div>
        <div onClick={() => filterStarMails(mails)}>
          <i className="fa-regular fa-star"></i>Started
        </div>
        <div onClick={() => filretSentMails(mails)}>
          <i className="fa-regular fa-paper-plane"></i> Sent
        </div>
        <div>
          <i className="fa-regular fa-trash-can"></i>Trash
        </div>
      </section>
    </section>
  )
}
