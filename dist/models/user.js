"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const app_data_source_1 = require("../app-data-source");
const user_entity_1 = require("../entity/user.entity");
class UserModel {
    static async getByEmail(email) {
        const user = await app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({ email });
        return user;
    }
    static async signUp(data) {
        const user = await app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({ email: data.email });
        if (user) {
            return false;
        }
        const newUser = await app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(data);
        return newUser;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map