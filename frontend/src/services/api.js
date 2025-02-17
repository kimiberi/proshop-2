import axios from "axios";

const API_BASEURL = "https://rickandmortyapi.com";

const api = axios.create({
    baseURL: API_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getCardContent = () => api.get("/api/character/");

export default api;