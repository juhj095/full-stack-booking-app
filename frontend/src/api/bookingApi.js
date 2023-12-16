const BASE_URL = "http://localhost:3004";

export const getAllFacilitiesByType = async (type) => {
    const response = await fetch(`${BASE_URL}/api/facilities/${type}`);
    console.log(response)
    return response.json();
};

export const getAllBookingsByFacility = async (facilityId) => {
    const response = await fetch(`${BASE_URL}/api/bookings/${facilityId}`);
    return response.json();
};