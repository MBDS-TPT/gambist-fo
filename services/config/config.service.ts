import Config from "../../config/config.json";

export const getBaseUrl = () => process.env.CONF_API_URL || process.env.CONF_BASE_URL || Config.BASE_URL;

export class ConfigService {


    static async getCurrency() {
        return ConfigService.fetchData(Config.Currency)
        .then((res) => {
            return res[0].configvalue;
        }).catch((err) => console.log(err));
    }

    static async getMaximumBetValue() {
        return ConfigService.fetchData(Config.SiteSetting.MaximumBetValue)
        .then((res) => {
            return res[0].configvalue;
        }).catch((err) => console.log(err));
    }

    static async getMinimumBetValue() {
        return ConfigService.fetchData(Config.SiteSetting.MinimumBetValue)
        .then((res) => {
            return res[0].configvalue;
        }).catch((err) => console.log(err));
    }


    static async fetchData(uri: string, params: any=null)  {
        try {
            let paramsString = "";
            if(params) {
                const keys = Object.keys(params)
                const searchParams = new URLSearchParams();
                for(const key of keys)
                    searchParams.append(key, params[key])
                    paramsString = searchParams.toString();
            }
            console.log("$>", getBaseUrl() + uri + (params ? "?" + paramsString : ""), 'GET')
            const res = await fetch(getBaseUrl() + uri + (params ? "?" + paramsString : ""))
            return await res.json()
        } catch(error) {
            console.error("error >", error)
        }
    }

}