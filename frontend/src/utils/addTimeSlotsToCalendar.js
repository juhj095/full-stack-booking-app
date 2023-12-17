export const addTimeSlotsToCalendar = (bookings) => {
    let timeSlots = [];
    const firstDay = new Date("2024-01-08");
    for (let day = 0; day < 7; day++) {
        for (let hour = 8; hour < 20; hour++) {
            let currentDate = new Date(firstDay);
            currentDate.setDate(firstDay.getDate() + day);
            currentDate.setHours(hour);

            const currentTimestamp = currentDate.getTime();
            const isBooked = bookings.some((booking) => {
                const bookingTime = new Date(booking.time).getTime();
                return bookingTime === currentTimestamp;
            });

            timeSlots.push(isBooked ? null : currentDate.toLocaleTimeString());
        }
    }
    return timeSlots;
}