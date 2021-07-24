import BasicService from "../basic.service";
import Config from "../../config/config.json";
import { Bet } from "../../model/Model";

export class AuthService extends BasicService {

    static async login(login: string, password: string) {
        return BasicService.postData(Config.Authentification.Login, {
            username: login,
            password: password
        }, 'POST');
    }

    static logout() {
        localStorage.removeItem('userinfos');
        this.redirect('/home')
    }

    static getUserInfosFromLS() {
        const userinfos = localStorage.getItem('userinfos');
        if(userinfos)   
            return JSON.parse(userinfos);
        else return null;
    }

    static saveUserInfosToLS(user: any) {
        localStorage.setItem('userinfos', JSON.stringify(user));
    }

    static getUserMatchIds() {
        const user = this.getUserInfosFromLS();
        if(user) {
            return user.bets.map((bet: Bet) => {
                return bet.match?.id;
            })
        }
        return [];
    }

}