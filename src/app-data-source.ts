import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    entities: ["dist/entity/*.js"],
    migrations: [],
    logging: true,
    synchronize: true,
});
