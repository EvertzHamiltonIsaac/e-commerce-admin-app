const getTokenFromLocalStorage = localStorage.getItem("sessionToken") ? localStorage.getItem("sessionToken") : null

export const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        Accept: "application/json"
    }
}