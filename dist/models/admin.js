"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const app_data_source_1 = require("../app-data-source");
const admin_entity_1 = require("../entity/admin.entity");
class AdminModel {
    static async signUp(data) {
        const result = await this.getByEmail(data.email);
        if (result) {
            return false;
        }
        const admin = await app_data_source_1.myDataSource.getRepository(admin_entity_1.Admin).save(data);
        return admin;
    }
    static async getByEmail(email) {
        const admin = await app_data_source_1.myDataSource
            .getRepository(admin_entity_1.Admin)
            .findOneBy({ email: email });
        if (!admin) {
            return false;
        }
        return admin;
    }
}
exports.AdminModel = AdminModel;
//# sourceMappingURL=admin.js.map