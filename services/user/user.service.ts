import BasicService from "../basic.service";
import Config from "../../config/config.json";
import { AuthService } from "../auth/auth.service";

export class UserService extends BasicService {

    static async changePassword(password: string, newPassword: string, onSuccess=(res: any) => {}, onFail=(err: any) => {}) {
        const user = AuthService.getUserInfosFromLS();
        return await BasicService.postData(Config.User.ChangePassword, {id: user.id, password, newPassword}, 'PUT')
        .then((res) => {
            AuthService.saveUserInfosToLS(res.data);
            onSuccess(res);
            return res;
        }).catch(err => {
            onFail(err);
            console.error(err);
        });
    }
    
    static async editProfil(firstname: string, lastname: string, onSuccess=(res: any) => {}, onFail=(err: any) => {}) {
        const user = AuthService.getUserInfosFromLS();
        return await BasicService.postData(Config.User.EditProfil, {id: user.id, firstname, lastname}, 'PUT')
        .then((res) => {
            AuthService.saveUserInfosToLS(res.data);
            onSuccess(res);
            return res;
        }).catch(err => {
            onFail(err);
            console.error(err);
        });
    }
    
    static async creditAccount(password: string, montant: number, onSuccess=(res: any) => {}, onFail=(err: any) => {}) {
        const user = AuthService.getUserInfosFromLS();
        return await BasicService.postData(Config.User.CreditAccount, {id: user.id, password, montant}, 'PUT')
        .then((res) => {
            AuthService.saveUserInfosToLS(res.data);
            onSuccess(res);
            return res;
        }).catch(err => {
            onFail(err);
            console.error(err);
        });
    }

}