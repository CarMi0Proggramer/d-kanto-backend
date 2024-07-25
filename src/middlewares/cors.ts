import cors from "cors";

const Accepted_Origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://d-kanto-admin.netlify.app",
    "https://d-kanto-frontend.netlify.app",
]

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        if (Accepted_Origins.includes(origin) || !origin) {
            return callback(null, true);
        }
        
        return callback(new Error(`Not allowed by CORS ${origin} ${Accepted_Origins.includes(origin)}`));
    },
    credentials: true
})