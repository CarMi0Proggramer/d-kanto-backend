"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const host = "roundhouse.proxy.rlwy.net";
const port = 48361;
const password = "xYVbmPTsDmpBMXBekgtUKxrwiVWiepOI";
const username = "postgres";
const database = "railway";
exports.myDataSource = new typeorm_1.DataSource({
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
});
//# sourceMappingURL=app-data-source.js.map