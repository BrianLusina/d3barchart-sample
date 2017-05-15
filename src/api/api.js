/**
 * @author lusinabrian on 15/05/17.
 * @notes: Fetch JSON from given url, parse the data and display results
 */
import get from 'axios';

/**
 * Fetches data from given url
 * @param {String} url to fetch data from
 * @return {object} JSON object with data from given url
 * */
function fetchData(url){
    get(url).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.error(error);
    })
}

export default fetchData;