const BASE_URL = "http://localhost:3004";

export const getAllSportTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/sports`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const getAllFacilities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/facilities`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
    
}

export const getAllFacilitiesByType = async (type) => {
    try {
        const response = await fetch(`${BASE_URL}/api/facilities/${type}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getAllBookingsByFacility = async (facilityId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bookings/${facilityId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};