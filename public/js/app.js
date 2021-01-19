//renders content to html page here input argument is the data from api
function renderContent(data) {
    let renderHTML = '<div class="dailyFeed">';
    renderHTML = renderHTML + `<h1 id="title">${data.title}</h1>`;
    if(data.media_type === 'image'){
        try {
            renderHTML = renderHTML + `<div id="img/vid"><img src="${data.hdurl}"></div>`;
        } catch {
            renderHTML = renderHTML + `<div id="img/vid"><img src="${data.url}"></div>`;
        }
    } else if(data.media_type === 'video') {
        renderHTML = renderHTML + `<div id="img/vid"><iframe width="650" height="345" src="${data.url}">
        </iframe>'</div>`;
    }
    renderHTML = renderHTML + `<div id="date">Date: ${data.date}</div>`;
    renderHTML = renderHTML + `<div id="description">${data.explanation}</div>`;
    if(data.copyright){
        renderHTML = renderHTML + `<div id="copyright">copyright @ ${data.copyright}</div>`;
    } else {
        renderHTML = renderHTML + `<div id="copyright">No copyright</div>`;
    }
    return renderHTML; //html to be rendered
}


//selecting elements from html document
const sdate = document.querySelector('#sdate');
const rdate = document.querySelector('#rdate');
const typeSelector = document.querySelector('.typeSelector');
const sdatepanel = document.querySelector('.sdatepanel');
const rdatepanel = document.querySelector('.rdatepanel');
//const utc = new Date().toJSON().slice(0,10)
const ssubmitForm = document.querySelector('#ssubmitForm');
const rsubmitForm = document.querySelector('#rsubmitForm');
const getSpecificDate = document.querySelector('#getSpecificDate');
const getStartDate = document.querySelector('#getStartDate');
const getEndDate = document.querySelector('#getEndDate');
const mainContent = document.querySelector('.main-content');
const errorMSG = document.querySelector('#errorMSG');
const processBar = document.querySelector('#processBar');

//adding click event listeners
sdate.addEventListener('click', () => {
    rdatepanel.style.display = 'none';
    rdate.style.display = 'none';
    sdate.style.display = 'block';
    sdatepanel.style.display = 'block';
})

rdate.addEventListener('click', () => {
    rdatepanel.style.display = 'block';
    rdate.style.display = 'block';
    sdate.style.display = 'none';
    sdatepanel.style.display = 'none';
})

//submiting the form
ssubmitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMSG.innerHTML = ``;
    processBar.innerHTML = `processing your request...`;
    let url = '/nasa-daily';
    if(getSpecificDate.value) {
         url = `${url}?date=${getSpecificDate.value}`;
    } else {
        processBar.innerHTML = ``;
        return errorMSG.innerHTML =  `Enter a Valid date!!!`;
    }
    fetch(url).then(res => res.json())
    .then(data => {
        if(data.name || data.name === 'Error') {
            processBar.innerHTML = ``;
            errorMSG.innerHTML = `feed for the requested date is not available`;
        } else {
            processBar.innerHTML = ``;
            mainContent.insertAdjacentHTML('beforeend',renderContent(data));
        }
    })
    .catch(err => err);
})

rsubmitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMSG.innerHTML = ``;
    processBar.innerHTML = `processing your request...`;
    let url = '/nasa-daily';
    if(getStartDate.value && getEndDate.value) {
        url = `${url}?start_date=${getStartDate.value}&end_date=${getEndDate.value}`;
    } else {
        processBar.innerHTML = ``;
        return errorMSG.innerHTML =  `Enter a Valid range of date!!!`;
    }
    fetch(url).then(res => res.json())
    .then(data => {
        if(data.name || data.name === 'Error') {
            processBar.innerHTML = ``;
            errorMSG.innerHTML = `feed for the requested date range is not available`;
        } else {
            processBar.innerHTML = ``;
            for(let i= 0; i<data.length;i++) {
                mainContent.insertAdjacentHTML('beforeend',renderContent(data[i]));
            }
        }
    })
    .catch(err => err);
})