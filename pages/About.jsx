export function About() {
    return (
        <section className='about'>
            <div className='container'>
                <h1 className='title animate__animated animate__fadeInDown'>Welcome</h1>
                <p className='description animate__animated animate__fadeInUp'>
                    We are Bar Ben Haim and Nir Fakiro, students at Coding Academy.
                </p>
                <div className='appsus-section animate__animated animate__fadeInUp'>
                    <h2>About Appsus</h2>
                    <p>Appsus is a daughter company of Google that represents three applications:</p>
                    <ul className='app-details-container'>
                        <li>Google Keep</li>
                        <li>Gmail</li>
                        <li>Google Books</li>
                    </ul>
                </div>
                <div className='visuals'></div>
            </div>
        </section>
    )
}
