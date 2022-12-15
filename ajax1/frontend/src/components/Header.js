function Header() {
    if (!document.cookie.includes("token")) {
        return (
            <header>
                <h1>Napoje</h1>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </header>
        );
    } else {
        return (
            <header>
                <h1>Napoje</h1>
                <a href="/logout">Logout</a>
                <button id="logout"
                    onClick={() => {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        window.location.reload();
                    }}>
                        Logout
                </button>
            </header>
        );
    }
}

export default Header;