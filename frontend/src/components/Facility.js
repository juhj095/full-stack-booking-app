import { Link } from "react-router-dom";

const Facility = (props) => {
    const { name, address } = props;
    return(
        <div>
            <Link to={`/kentät/${name}`}>
                <h2>{name}</h2>
                <p>Osoite: {address}</p>
            </Link>
        </div>
    );
}

export default Facility;