const TimeSlot = (props) => {
    return (
        <>
        {
            props.time ? <button className="free">Vapaa</button> :
            <div className="booked">Varattu</div>
        }
        </>
    );
}

export default TimeSlot;