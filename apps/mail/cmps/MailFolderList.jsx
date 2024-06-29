const { useState } = React
export function MailFolder({ onOpenCompose, mails, getSentMails, getInbox, getStarredMails }) {
    const [isFolderOpen, setIsFolderOpen] = useState(false)

    function toggleFolder() {
        console.log('dg')

        setIsFolderOpen((isFolderOpen = true))
    }
    return (
        <section className='folder-container'>
            <div className='btn-container'>
                <button onClick={onOpenCompose} className='compose-btn'>
                    <i className='fa-solid fa-pencil'></i>Compose
                </button>
            </div>

            <section className='folder-item'>
                <button className='hamburger-btn' onClick={toggleFolder}>
                    <i className='fa-solid fa-bars'></i>
                </button>
                <div onClick={() => getInbox()}>
                    <i className='fa-solid fa-inbox'></i>Inbox
                    <p> ({mails.length})</p>
                </div>
                <div onClick={() => getStarredMails()}>
                    <i className='fa-regular fa-star'></i>Starred
                </div>
                <div onClick={() => getSentMails()}>
                    <i className='fa-regular fa-paper-plane'></i> Sent
                </div>
                <div>
                    <i className='fa-regular fa-trash-can'></i>Trash
                </div>
            </section>
        </section>
    )
}
