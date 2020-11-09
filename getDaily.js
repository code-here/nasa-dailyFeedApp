const axios = require('axios').default;

const baseurl = "https://api.nasa.gov/planetary/apod?api_key=VpLegQawyYVKrij4PAm84X7EgNvn7DDiaeo6UF3g";


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