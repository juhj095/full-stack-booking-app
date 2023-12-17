import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const onLoginClicked = async () => {

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