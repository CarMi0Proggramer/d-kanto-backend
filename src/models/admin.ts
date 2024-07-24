import { myDataSource } from "../app-data-source";
import { Admin } from "../entity/admin.entity";

export class AdminModel {
    static async signUp(data: {
        name: string;
        email: string;
        password: string;
    }) {
        const result = await myDataSource.getRepository(Admin).findOneBy({ email: data.email });
        if (result) {
            return false;
        }

        const admin = await myDataSource.getRepository(Admin).save(data);
        return admin;
    }

    static async getByEmail(data: { email: string }) {
        const admin = await myDataSource
            .getRepository(Admin)
            .findOneBy({ email: data.email });
        if (!admin) {
            return false;
        }

        return admin;
    }
}
