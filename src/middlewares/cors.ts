import cors from "cors";

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const Accepted_Origins = [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:4173",
            "https://d-kanto-frontend.onrender.com",
            "https://d-kanto-admin.onrender.com"
        ]

        if (Accepted_Origins.includes(origin) || !origin) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
})