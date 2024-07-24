import { DataSource } from "typeorm"

const host = "roundhouse.proxy.rlwy.net"
const port = 48361
const password = "xYVbmPTsDmpBMXBekgtUKxrwiVWiepOI"
const username = "postgres"
const database = "railway"

export const myDataSource = new DataSource({
    type: "postgres",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: ["dist/entity/*.js"],
    migrations: [],
    logging: true,
    synchronize: true
})