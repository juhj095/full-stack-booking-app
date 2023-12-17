const Weekday = (props) => {
    const { weekday } = props;

    return (
        <div>
            {weekday.day} <br/>
            {weekday.date}
        </div>
    );
}

export default Weekday;