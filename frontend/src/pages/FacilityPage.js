import { useState, useEffect } from "react";
import { getAllFacilitiesByType } from "../api/bookingApi";
import Facility from "../components/Facility";

const FacilityPage = (props) => {
    const { type } = props;
    const [loading, setLoading] = useState(true);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllFacilitiesByType(type);
                setFacilities(response);
            } catch (error) {
                console.error("Error fetching facilities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    return (
        <>
        <h1>{type}</h1>
        {
            loading ? <p>Loading...</p> :
            facilities.map(facility => (
                <Facility key={facility.id} name={facility.name} address={facility.address}/>
            ))
        }
        </>
    );
}

export default FacilityPage;