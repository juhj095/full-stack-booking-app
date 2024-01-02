import { useEffect, useState } from "react";
import { getAllBookingsByFacility } from "../api/bookingApi";
import { addTimeSlotsToCalendar } from "../utils/addTimeSlotsToCalendar";
import "./calendar.css";
import Weekday from "../components/Weekday";
import TimeSlot from "../components/TimeSlot";
import { useUser } from "../auth/useUser";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()
    const { facility } = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const timeSlots = addTimeSlotsToCalendar(bookings);
    const [errorMessage, setErrorMessage] = useState("");
    const [chosenTime, setChosenTime] = useState(new Date(0));

    const changeTime = (changedTime) => {
        setChosenTime(changedTime);
        setErrorMessage("");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBookingsByFacility(facility.id);
                setBookings(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [facility]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>;

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
            <button className="bookButton">Varaa aika</button>
        </div>
    );
}

export default FacilityPage;