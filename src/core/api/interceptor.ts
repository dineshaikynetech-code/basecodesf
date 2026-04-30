import { api } from "./client"

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    // future: attach token
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error)
        return Promise.reject(error)
    }
)