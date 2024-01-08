const TimeSlot = (props) => {
    const changeChosenTime = () => {
        props.handleTimeSlotClick(props.time.toISOString());
    }

    return (
        <>
        {
            props.time ? <button className="free" onClick={changeChosenTime}>Vapaa</button> :
            <div className="booked">Varattu</div>
        }
        </>
    );
}

export default TimeSlot;