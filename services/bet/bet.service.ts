import BasicService from "../basic.service";
import Config from "../../config/config.json";
import { Bet } from "../../model/Model";
import { AuthService } from "../auth/auth.service";

export class BetService extends BasicService {

    static async getUserBet (id: any) {
        return BasicService.fetchData(Config.Bet.FindAll, {
            betId: id
        });
    } 

    static async postBet(bet: Bet) {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            bet.userId = user.id;
            return BasicService.postData(Config.Bet.Add, bet);
        }
        this.redirect('/login');
    }

    static addBetToLS(bet: Bet) {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            console.log(user.bets)
            user.bets.push(bet);
            console.log(user.bets)
            AuthService.saveUserInfosToLS(user);
        }
    }

    static async getUserBets() {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            return this.fetchData(Config.Bet.FindByUser, {
                userid: user.id
            })
        }
        return []
    }

    static async getUserBetsByCategory(categoryId: any) {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            return this.fetchData(Config.Bet.FindByUserAndCategory, {
                userid: user.id,
                categoryId: categoryId
            })
        }
        return []
    }

    static getUserBetsFromLS() {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            return user.bets
        } 
        return []
    }

}