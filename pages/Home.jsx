const { useNavigate } = ReactRouterDOM

export function Home() {
    const navigate = useNavigate()

    return (
        <section className='home'>
            <h1 className='animate__animated animate__fadeInDown'>Appsus</h1>
            <p className='animate__animated animate__fadeInUp'>All you need in one place</p>
            <div className='logos-container'>
                <img
                    src='assets/img/gmail.png'
                    alt='Gmail Logo'
                    className='icon animate__animated animate__bounceIn'
                    onClick={() => navigate('/mail')}
                />
                <img
                    src='assets/img/googleK.png'
                    alt='Google Keep Logo'
                    className='icon animate__animated animate__bounceIn'
                    style={{ animationDelay: '0.7s' }}
                    onClick={() => navigate('/note')}
                />
                <img
                    src='assets/img/books.png'
                    alt='Google Books Logo'
                    className='icon animate__animated animate__bounceIn'
                    style={{ animationDelay: '1.2s' }}
                    onClick={() => navigate('/books')}
                />
            </div>
        </section>
    )
}
