import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import { login } from "../api/userApi";

const LoginPage = () => {
    const [token, setToken] = useToken();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const onLoginClicked = async () => {
        try {
            const response = await login(username, password);
            const { token } = response;
            setToken(token);
            navigate("/user");
        } catch (error) {
            console.error("Login error:", error);
        }
    }
    return (
        <div className="contentContainer">
            <h1>Kirjaudu</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={!username || !password} onClick={onLoginClicked}>Kirjaudu</button>
            <button onClick={() =>navigate("/signup")}>Luo tunnus</button>
        </div>
    );
}

export default LoginPage;