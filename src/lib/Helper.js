const BASE_URL = "http://localhost:3000/"

export const getUserData = async () => {
    const response = await fetch(`${BASE_URL}api/users`)
    if (response) {
        const json = await response.json();
        return json;
    }
}

export const getUserByIdData = async (userId) => {
    const response = await fetch(`${BASE_URL}api/users/${userId}`);
    const json = await response.json()

    if (json) return json;
    return {}
}

// posting a new user
export async function addUserData(formData) {
    try {
        const Options = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}api/users`, Options)
        const json = await response.json()

        return json;
    } catch (error) {
        return error;
    }
}


// Update a new user
export async function updateUserData(userId, formData) {
    const Options = {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/users/${userId}`, Options)
    const json = await response.json()
    return json;
}


// Delete a new user
export async function deleteUserData(userId) {
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },
    }

    const response = await fetch(`${BASE_URL}api/users/${userId}`, Options)
    const json = await response.json()
    return json;
}