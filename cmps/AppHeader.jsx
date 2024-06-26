const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className='app-header'>
            <Link to='/'>
                <h3 className='logo'>
                    <span>A</span>
                    <span>p</span>
                    <span>s</span>
                    <span>o</span>
                    <span>s</span>
                </h3>
            </Link>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/mail'>Mail</NavLink>
                <NavLink to='/note'>Note</NavLink>
            </nav>
        </header>
    )
}
