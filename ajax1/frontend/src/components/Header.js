function Header() {
    if (!document.cookie.includes("token")) {
        return (
            <header>
                <a href="/"><h1>Napoje</h1></a>
                <div className="login">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <a href="/"><h1>Napoje</h1></a>
                <div className="login">
                    <a href="/profile">Profile</a>
                    <a
                        onClick={() => {
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            window.location.reload();
                        }}>
                        Logout
                    </a>
                </div>
            </header>
        );
    }
}

export default Header;