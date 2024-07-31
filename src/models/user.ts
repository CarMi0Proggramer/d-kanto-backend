import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

export class UserModel {
    static async getByEmail(email: string){
        const user = await myDataSource.getRepository(User).findOneBy({email});
        return user;
    }

    static async signUp(data: {
        name: string, 
        email: string , 
        password: string,
    }){
        const user  = await this.getByEmail(data.email);
        if (user) {
            return false;
        }

        const newUser = await myDataSource.getRepository(User).save(data);
        return newUser;
    }
}