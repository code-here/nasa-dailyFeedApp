const express = require('express');
const path = require('path');
const hbs = require('hbs');
const dailyData = require('./getDaily');


const app = express();

//define config paths for express
const staticFolder = path.join( __dirname, '\\public');
const viewsPath = path.join(__dirname, '\\templates\\views');
const partialsPath = path.join(__dirname, '\\templates\\partials')

//setting up static directory to serve for express
app.use(express.static(staticFolder));


//setting up handlebars engine and directory(default directory for handlebars is /views)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//get index or home page
app.get('', (req, res) => {
    //render method is used to rander templates with partials where as send function is used to display static content
    res.render('index', {
        title: 'Nasa daily feed app'  //callback object's contents are used in templates
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        email: 'abhinavy14@gmail.com'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        author: 'abhinav yadav',
        work: "we use nasa api 'apod' to provide daily feed!"
    })
})


//app API endpoint
app.get('/nasa-daily',(req, res) => {
    console.log(req.query);
    if(req.query.date) {  //url&date=2020-11-4
        dailyData(data => res.send(data),date = req.query.date);  //dailyData is a function in dailyData.js to get data using nasa apod api
    } else if(req.query.start_date && req.query.end_date) {  //url&start_date=2020-11-1&end_date=2020-11-4
        dailyData(data => res.send(data),date = false,start_date = req.query.start_date,end_date = req.query.end_date);
    } else { //url default case
        dailyData(data => res.send(data));
    }
})

app.get('/help/*', (req, res) => {  //* is a wildcard charactor in express
    res.render('404page', {
        title: '404 "NOT FOUND" PAGE REACHED',
        errorMSG: 'HELP article requested by you is not available or not found',
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 "NOT FOUND" PAGE REACHED',
        errorMSG: 'page not found'
    })
})

//start up the server on port 3000
app.listen(3000, () => {
    console.log('express server has started on port 3000 correctly');
})