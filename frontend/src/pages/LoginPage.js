import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const onLoginClicked = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            const { token } = response;
            onLogin(token)
            navigate("/user");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    return (
        <div className="contentContainer">
            <form onSubmit={onLoginClicked}>
                <h1>Kirjaudu</h1>
                {errorMessage && <div>{errorMessage}</div>}
                <input placeholder="nimimerkki" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="salasana" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button disabled={!username || !password}>Kirjaudu</button>
            </form>
            
            <div>Etkö ole vielä rekisteröitynyt?</div>
            <button onClick={() =>navigate("/signup")}>Rekisteröidy</button>
        </div>
    );
}

export default LoginPage;