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

    static async refreshUserInfo() {
        let user = this.getUserInfosFromLS();
        if(user) {
            user = await BasicService.fetchData(Config.Authentification.UserInfos, {userid: user.id});
            this.saveUserInfosToLS(user);
        }
    }
   
    static async registration(userinfo: any) {
        return BasicService.postData(Config.Authentification.Registration, {
            email: userinfo.email,
            password: userinfo.password,
            firstname: userinfo.firstname,
            lastname: userinfo.lastname,
            username: userinfo.username,
            dayOfBirth: userinfo.dayOfBirth
        }, 'POST');
    }

    static logout() {
        localStorage.removeItem('userinfos');
        this.redirect('/home')
    }

    static getUserInfosFromLS() {
        const userinfos = localStorage.getItem('userinfos');
        try {
            if(userinfos)   
                return JSON.parse(userinfos);
        }
        catch(err) {
             return null;
        }
    }

    static updateUserBalance(balance: number) {
        const user = this.getUserInfosFromLS();
        if(user) {
            user.bankBalance = balance;
            this.saveUserInfosToLS(user);
        }
    }

    static isLogged() {
        return !!this.getUserInfosFromLS();
    }

    static saveUserInfosToLS(user: any) {
        localStorage.setItem('userinfos', JSON.stringify(user));
    }

    static getUserBalance() {
        const user = this.getUserInfosFromLS();
        return user.bankBalance;
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