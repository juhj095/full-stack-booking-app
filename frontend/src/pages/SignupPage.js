import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const onSignupClicked = async () => {

    }
    return (
        <div className="contentContainer">
            <h1>Luo tunnus</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button disabled={!username || !password} onClick={onSignupClicked}>Luo tunnus</button>
            <button onClick={() =>navigate("/login")}>Kirjaudu</button>
        </div>
    );
}

export default SignupPage;