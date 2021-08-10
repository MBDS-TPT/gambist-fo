import BasicService from "../basic.service";
import Config from "../../config/config.json";

export class UserService extends BasicService {

    static async changePassword(password: string, newPassword: string) {
        return BasicService.postData(Config.User.ChangePassword, {password, newPassword}, 'PUT');
    }

    static async editProfil(firstname: string, lastname: string) {
        return BasicService.postData(Config.User.EditProfil, {firstname, lastname}, 'PUT');
    }

    static async creditAccount(password: string, montant: number) {
        return BasicService.postData(Config.User.CreditAccount, {password, montant}, 'PUT');
    }

}