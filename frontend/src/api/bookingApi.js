const BASE_URL = "http://localhost:3004";

export const getAllFacilities = async () => {
    const response = await fetch(`${BASE_URL}/api/facilities`);
    return response.json();
}

export const getAllFacilitiesByType = async (type) => {
    const response = await fetch(`${BASE_URL}/api/facilities/${type}`);
    return response.json();
};

export const getAllBookingsByFacility = async (facilityId) => {
    const response = await fetch(`${BASE_URL}/api/bookings/${facilityId}`);
    return response.json();
};