import { useEffect, useState } from "react";
import { getAllBookingsByFacility } from "../api/bookingApi";
import { addTimeSlotsToCalendar } from "../utils/addTimeSlotsToCalendar";
import "./calendar.css";
import Weekday from "../components/Weekday";
import TimeSlot from "../components/TimeSlot";

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
    const { facility } = props;
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const timeSlots = addTimeSlotsToCalendar(bookings);
    const [chosenTime, setChosenTime] = useState();

    const changeTime = (changedTime) => {
        setChosenTime(changedTime);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBookingsByFacility(facility.id);
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [facility]);

    return (
        <>
        <h1>{facility.name}</h1>
        <p>Osoite: {facility.address}</p>
        {
            loading ? <p>Loading...</p> :
            <div className="calendarContainer">
                <div className="calendarHeader">
                    <div></div>
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
                            <TimeSlot key={index} time={slot}></TimeSlot>
                        ))
                    }
                </div>
            </div>
        }
        </>
    );
}

export default FacilityPage;