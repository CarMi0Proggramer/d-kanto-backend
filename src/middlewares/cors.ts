import cors from "cors";

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const Accepted_Origins = [
            "http://localhost:5173",
            "http://localhost:4173",
            "https://d-kanto-admin.netlify.app",
            "https://d-kanto-frontend.netlify.app",
        ]

        if (Accepted_Origins.includes(origin) || !origin) {
            return callback(null, true);
        }

        console.log(origin);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
})