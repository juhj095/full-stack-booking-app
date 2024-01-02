import { useState, useEffect } from "react";
import { getAllFacilitiesByType } from "../api/bookingApi";
import Facility from "../components/Facility";

const SportPage = (props) => {
    const { type } = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllFacilitiesByType(type);
                setFacilities(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <h1>{type}</h1>
        {
            facilities.map(facility => (
                <Facility key={facility.id} name={facility.name} address={facility.address}/>
            ))
        }
        </>
    );
}

export default SportPage;