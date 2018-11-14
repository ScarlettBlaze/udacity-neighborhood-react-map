// FourSquare API.
class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2"
    }

    static auth() {
        const keys = {
            client_id: "WLNS0Z1NP3DZMPWIVV0XNKIJURDW42GHNOIXRIINZXOIDLIV",
            client_secret: "VVTWM0IGFUIF5IEPJFUEBLQ32I5HKWRM14CJ1RGHAMPIOAYP",
            v: "20181113"
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }

    static headers() {
        return {
            Accept: "application/json"
        };
    }

    static requestFetch(endPoint, method, urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuild(urlParams)}`, requestData).then(res => res.json());
    }

    static urlBuild(urlParams) {
        if(!urlParams) {
            return '';
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join("&");
    }
}

export default class SquareAPI {
    static search(urlParams) {
        return Helper.requestFetch("/venues/search", "GET", urlParams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.requestFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getVenueImages(VENUE_ID) {
        return Helper.requestFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}