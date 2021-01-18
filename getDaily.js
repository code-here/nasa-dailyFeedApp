const axios = require('axios').default;

const api_key = process.env.APOD_API_KEY;

const baseurl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;


const dailyData = (callback,date = false, start_date = false, end_date = false) => {
    let url = baseurl;
    if(date){
        url = `${baseurl}&date=${date}`;
    }
    if(start_date && end_date) {
        url = `${baseurl}&start_date=${start_date}&end_date=${end_date}`;
    }
    console.log(`dailydata ${url}`)
    axios({
        url: url,
        method: 'GET'
    })
    .then(({ data }) => callback(data))
    .catch(err => callback(err))
}


module.exports = dailyData;