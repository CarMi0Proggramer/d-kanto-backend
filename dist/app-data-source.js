"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    entities: ["dist/entity/*.js"],
    migrations: [],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map