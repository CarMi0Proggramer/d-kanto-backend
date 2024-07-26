"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const Accepted_Origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://d-kanto-frontend.netlify.app",
    "https://d-kanto-admin.netlify.app",
    "https://d-kanto-frontend.onrender.com",
    "https://d-kanto-admin.onrender.com",
];
const corsMiddleware = () => (0, cors_1.default)({
    origin: (origin, callback) => {
        if (Accepted_Origins.includes(origin) || !origin) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
});
exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=cors.js.map