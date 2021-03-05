# nasa-dailyFeedApp

This a single page web app build using **APOD**(Astronomy Picture of the Day) api from NASA.
i have build this app to practice building api in node.js .

## How to run

you will need to install node and git on your system to run this web app.

open the terminal and enter:

	git clone https://github.com/code-here/nasa-dailyFeedApp
	cd nasa-dailyFeedApp
	npm install

export/set this two environment variable:

- APOD_API_KEY
- PORT

you can get the api key from [here](https://api.nasa.gov).
you can also use env-cmd pkg from npm to set environment variable.

then run:

	npm run start

then open http://localhost:port/ in your browser.

## Working

this web app fetches data from apod api to the route localhost:port/nasa-daily in
json format, and renders it in browser.
