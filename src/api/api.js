/**
 * @author lusinabrian on 15/05/17.
 * @notes: Fetch JSON from given url, parse the data and display results
 */
import axios from 'axios';

/**
 * Fetches data from given url, assigns to variables and returns results
 * @param {String} url to fetch data from
 * @return {object} JSON object with data from given url
 * */
export default function fetchData(url){
    let description = "", fromDate = "", toDate = "";
    let name = "", frequency = "", data = [];
    return axios.get(url).then(function(response){
        description = response.data.description;
        fromDate = response["data"]["from_date"];
        toDate = response["data"]["to_date"];
        name = response["data"]["name"];
        frequency = response["data"]["frequency"];
        data = response["data"]["data"];

        return {
            description, frequency, fromDate, toDate, data, name
        }
    }).catch(function(error){
        console.error("Error: ", error);
    });
}

