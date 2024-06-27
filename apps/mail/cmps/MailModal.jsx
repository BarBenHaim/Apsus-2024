const { useState } = React

export function MailModal({ closeModal, crateMail }) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleChange(ev) {
    const field = ev.target.value
    setTo(field)
  }
  function handleChangeSublect(ev) {
    const field = ev.target.value
    setSubject(field)
  }
  function handleChaneMessage(ev) {
    const field = ev.target.value
    setMessage(field)
  }

  return (
    <section>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>New Mail</h2>
          </div>
          <div className="modal-body">
            <form>
              <div>
                <label htmlFor="to">To:</label>
                <br />
                <input
                  onChange={(ev) => handleChange(ev)}
                  type="email"
                  id="to"
                  name="to"
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                  }}
                />
              </div>
              <div>
                <label htmlFor="subject">Subject:</label>
                <br />
                <input
                  onChange={(ev) => handleChangeSublect(ev)}
                  type="text"
                  id="subject"
                  name="subject"
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                  }}
                />
              </div>
              <div>
                <label htmlFor="body">Body:</label>
                <br />
                <textarea
                  onChange={(ev) => handleChaneMessage(ev)}
                  id="body"
                  name="body"
                  rows="10"
                  style={{ width: '100%', padding: '8px' }}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => crateMail(to, subject, message)}
              className="compose-button"
            >
              Send
            </button>
            <button className="compose-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
