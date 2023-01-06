function Header() {
    if (!document.cookie.includes("token")) {
        return (
            <header>
                <h1>Napoje</h1>
                <div className="login">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <h1>Napoje</h1>
                <a id="logout"
                    onClick={() => {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        window.location.reload();
                    }}>
                    Logout
                </a>
            </header>
        );
    }
}

export default Header;