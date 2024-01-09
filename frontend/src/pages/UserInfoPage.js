import { useEffect, useState } from "react";
import { useUser } from "../auth/useUser";
import { useNavigate } from "react-router-dom";
import { getAllBookingsByUser } from "../api/userApi";
import { useToken } from "../auth/useToken";

const UserInfoPage = () => {
    const user = useUser();
    const [token,] = useToken();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBookingsByUser(user.id, token);
                setBookings(response);
                setErrorLoading("");
            } catch (error) {
                setErrorLoading(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user, token]);

    if (!user) {
        navigate("/login");
        return null;
    }

    if (loading) return <p>Loading...</p>
    if (errorLoading) return <p>Error: {errorLoading}</p>;

    return (
        <>
        {
            !user ? <h1>Kirjaudu sisään</h1> :
            <>
            <h1>Omat varaukset: {user.user}</h1>
            {
                // TODO: make a booking component with ability to delete bookings
                bookings.map(booking => (
                    <p key={booking.id}>{booking.facilityName} {booking.time} {booking.address}</p>
                ))
            }
            </>
        }
        </>
    );
}

export default UserInfoPage;