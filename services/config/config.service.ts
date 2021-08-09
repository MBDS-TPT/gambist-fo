import BasicService from "../basic.service";
import Config from "../../config/config.json";

export class ConfigService  {

    static async getCurrency() {
        return "$";
    }

    static async getMaximumBetValue() {
        return 5000;
    }

    static async getMinimumBetValue() {
        return 5;
    }

}