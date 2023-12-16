const Facility = (props) => {
    const { name, address } = props;
    return(
        <div>
        <h2>{name}</h2>
        <p>{address}</p>
        </div>
    );
}

export default Facility;