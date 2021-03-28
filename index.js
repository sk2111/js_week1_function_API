const REST_COUNTRIES_API = 'https://restcountries.eu/rest/v2/all';
const REST_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';
const WEATHER_API_KEY = 'df398dbcdce3ef06e22d71448753d081';
const HTTP_METHOD = 'GET';

//print country lat,long,temperature (temp in openweather)
function httpRequest(method, url, callback) {
    if (method && url && typeof (callback) === 'function') {
        try {
            const request = new XMLHttpRequest();
            request.open(method, url, true);
            request.send();
            request.onload = function () {
                callback(JSON.parse(this.response));
            }
        }
        catch (e) {
            console.log("Request failed", e);
        }
    } else {
        console.log("Invalid paramters passed for request");
    }
}


httpRequest(HTTP_METHOD, REST_COUNTRIES_API, (countries) => {
    if (Array.isArray(countries)) {
        countries.forEach((country) => {
            const countryName = country.name;
            const [latitude, longitude] = country.latlng;

            if (latitude && longitude) {
                const latLongQuery = `lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
                httpRequest(HTTP_METHOD, REST_WEATHER_API + latLongQuery, (weatherInfo) => {
                    if (weatherInfo && weatherInfo.main) {
                        console.log(countryName, ":", weatherInfo.main.temp);
                    }
                });
            }
            else {
                console.log("Not a valid Coordinate for",countryName);
            }
        });
    }
});