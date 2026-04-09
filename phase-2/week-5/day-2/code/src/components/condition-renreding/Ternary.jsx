const Ternary = () => {
    const isLoggedIn = false;
    return (
        <>
            {isLoggedIn ? <h1>Welcome User</h1> : <h1>Welcome Guest</h1>}
            <button>{isLoggedIn ? "Logout" : "Login"}</button>
        </>
    );
};

export default Ternary;
