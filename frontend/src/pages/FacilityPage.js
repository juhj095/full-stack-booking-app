import { useEffect, useState } from "react";
import { getAllBookingsByFacility } from "../api/bookingApi";
import { addTimeSlotsToCalendar } from "../utils/addTimeSlotsToCalendar";
import "./calendar.css";
import Weekday from "../components/Weekday";
import TimeSlot from "../components/TimeSlot";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../api/userApi";

const daysOfWeek = [
    { day: "Maanantai", date: "8.1.2024" },
    { day: "Tiistai", date: "9.1.2024" },
    { day: "Keskiviikko", date: "10.1.2024" },
    { day: "Torstai", date: "11.1.2024" },
    { day: "Perjantai", date: "12.1.2024" },
    { day: "Lauantai", date: "13.1.2024" },
    { day: "Sunnuntai", date: "14.1.2024" }];
const times = Array.from({ length: 12 }, (_, index) => `${8 + index}:00`);

const FacilityPage = (props) => {
    const user = useUser();
    const [token,] = useToken();
    const navigate = useNavigate()
    const { facility } = props;
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState("");
    const [bookings, setBookings] = useState([]);
    const timeSlots = addTimeSlotsToCalendar(bookings);
    const [errorMessage, setErrorMessage] = useState(false);
    const [chosenTime, setChosenTime] = useState("");

    const changeTime = (changedTime) => {
        setChosenTime(changedTime);
        setErrorMessage(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBookingsByFacility(facility.id);
                setBookings(response);
                setErrorLoading("");
            } catch (error) {
                setErrorLoading(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [facility]);

    const handleBookButtonClicked = async () => {
        if (!user) navigate("/login");
        else if (!chosenTime) setErrorMessage(true)

        else {
            try {
                const success = await addBooking(chosenTime, facility.id, user.id, token);
                if (success) navigate("/user");
                else setErrorLoading("Booking failed");
            } catch (error) {
                setErrorLoading(error.message);
            }
        }
    }

    if (loading) return <p>Loading...</p>
    if (errorLoading) return <p>Error: {errorLoading}</p>;

    return (
        <div className="contentContainer">
            <h1>{facility.name}</h1>
            <p>Osoite: {facility.address}</p>

            <div className="calendarContainer">
                <div className="calendarHeader">
                    {
                        daysOfWeek.map(day => (
                            <Weekday key={day} weekday={day}></Weekday>
                        ))
                    }
                </div>
                <div className="calendarTime">
                    {
                        times.map(time => (
                            <div key={time}>{time}</div>
                        ))
                    }
                </div>
                <div className="calendarData">
                    {
                        timeSlots.map((slot, index) => (
                            <TimeSlot key={index} time={slot} handleTimeSlotClick={changeTime}></TimeSlot>
                        ))
                    }
                </div>
            </div>
            {errorMessage && <p>Valitse aika</p>}
            <button className="bookButton" onClick={handleBookButtonClicked}>Varaa aika</button>
        </div>
    );
}

export default FacilityPage;