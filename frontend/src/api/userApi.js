const BASE_URL = "http://localhost:3004";

export const signup = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Signup failed: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const getAllBookingsByUser = async (userId, token) => {
    try {
        //TODO: Verify user
        const response = await fetch(`${BASE_URL}/api/user/${userId}/bookings`);

        if (!response.ok) {
            throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const addBooking = async (time, facilityId, userId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/${userId}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, time, facilityId }),
        });
        return response.ok;
    } catch (error) {
        throw error;
    }
}