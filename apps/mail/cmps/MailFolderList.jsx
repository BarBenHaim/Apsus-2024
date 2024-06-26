export function MailFolder() {
  return (
    <section className="folder-container">
      <h1> folder</h1>
      <section className="folder-item">
        <div>
          <i className="fa-solid fa-inbox"></i>Inboxes
        </div>
        <div>
          <i className="fa-regular fa-star"></i>Started
        </div>
        <div>
          <i className="fa-regular fa-paper-plane"></i> Send
        </div>
        <div>
          <i className="fa-regular fa-trash-can"></i>Trash
        </div>
      </section>
    </section>
  )
}
