const TimeSlot = (props) => {
    const changeChosenTime = () => {
        props.handleTimeSlotClick(props.time);
    }

    return (
        <>
        {
            props.time ? <button className="free" onClick={changeChosenTime}>{props.time.toLocaleTimeString()}</button> :
            <div className="booked">Varattu</div>
        }
        </>
    );
}

export default TimeSlot;