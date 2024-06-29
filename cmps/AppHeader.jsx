const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 575)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 575)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
        document.body.classList.toggle('menu-open', isMenuOpen)
    }

    return (
        <header className='app-header'>
            <Link to='/'>
                <h3 className='logo'>
                    <span>A</span>
                    <span>p</span>
                    <span>p</span>
                    <span>s</span>
                    <span>u</span>
                    <span>s</span>
                </h3>
            </Link>
            {isMobile ? (
                <React.Fragment>
                    <button className='btn-toggle-menu' onClick={toggleMenu}>
                        <div className='hamburger-lines'>
                            {isMenuOpen ? <i className='fa-solid fa-times'></i> : <i className='fa-solid fa-bars'></i>}
                        </div>
                    </button>
                    <nav
                        className={`menu ${
                            isMenuOpen
                                ? 'open animate__animated animate__fadeInDown'
                                : 'animate__animated animate__fadeOutUp'
                        }`}
                    >
                        <NavLink to='/' onClick={toggleMenu}>
                            Home
                        </NavLink>
                        <NavLink to='/about' onClick={toggleMenu}>
                            About
                        </NavLink>
                        <NavLink to='/mail' onClick={toggleMenu}>
                            Gmail
                        </NavLink>
                        <NavLink to='/note' onClick={toggleMenu}>
                            Keep
                        </NavLink>
                        <NavLink to='/book' onClick={toggleMenu}>
                            Book
                        </NavLink>
                    </nav>
                </React.Fragment>
            ) : (
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/mail'>Gmail</NavLink>
                    <NavLink to='/note'>Keep</NavLink>
                    <NavLink to='/book'>Book</NavLink>
                </nav>
            )}
        </header>
    )
}
