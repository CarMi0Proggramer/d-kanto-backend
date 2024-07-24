import jwt from "jsonwebtoken";

export function signJWT(data: object) {
    const token = jwt.sign(
        data,
        process.env.SECRET_JWT_KEY,
        {
            expiresIn: "2h",
        }
    );

    return token;
}