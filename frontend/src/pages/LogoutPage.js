import { useEffect } from "react";

const LogoutPage = ({ onLogout }) => {
    useEffect(() => {
        onLogout();
    }, []);

    return (
        <h1>Olet kirjautunut ulos</h1>
    );
}

export default LogoutPage;