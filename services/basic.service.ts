import Config from '../config/config.json';

//https://gambist-backend.herokuapp.com/
export const getBaseUrl = () => process.env.API_URL || process.env.BASE_URL || Config.BASE_URL;

export default abstract class BasicService {

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

    static async postData(uri: string, params: any, method='POST') {
        console.log("$>", getBaseUrl() + uri, method)
        const response = await fetch(getBaseUrl() + uri, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        return response.json();
        // .then(response => response.json())
        // .then(json => console.log(json));
    }

    static redirect(link: string) {
        document.location.href = link;
    }

}