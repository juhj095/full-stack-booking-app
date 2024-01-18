import { useEffect, useState } from "react";
import { useUser } from "../auth/useUser";
import { useNavigate } from "react-router-dom";
import { getAllBookingsByUser, deleteBooking } from "../api/userApi";
import { useToken } from "../auth/useToken";
import Booking from "../components/Booking";

const UserInfoPage = () => {
    const user = useUser();
    const [token,] = useToken();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, [user, token]);

    const onDeleteBooking = (bookingId) => {
        try {
            const success = deleteBooking(bookingId, user.id, token);
            if (success) {
                fetchBookings();
            }
        } catch (error) {
            // Error deleting booking
        }
    }

    const fetchBookings = async () => {
        try {
            const response = await getAllBookingsByUser(user.id, token);
            setBookings(response);
            setErrorLoading("");
        } catch (error) {
            if (error.response && error.response.status == 401) navigate("/login");
        } finally {
            setLoading(false);
        }
    }

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
                bookings.length === 0 ? <p>Ei varauksia</p> :
                bookings.map(booking => (
                    <Booking key={booking.id} booking={booking} onDelete={onDeleteBooking} />
                ))
            }
            </>
        }
        </>
    );
}

export default UserInfoPage;