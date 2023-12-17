import { useNavigate } from "react-router-dom"
import UserInfoPage from "../pages/UserInfoPage";
import { useUser } from "./useUser";

export const PrivateRoute = (props) => {
    const navigate = useNavigate();
    const user = useUser();

    if (!user) navigate("/login");

    return <UserInfoPage></UserInfoPage>
}