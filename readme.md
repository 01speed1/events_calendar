# EventsCalendar
Welcome to EventsCalendar the test app to create event in your DB and Google Calendar

## Requiremets

Node v13.14.0 + npm
Docker and Docker Compose

add the file ```frontend/apiGoogleconfig.json``` use the file ```apiGoogleconfig copy. json``` like reference

add the ```.env``` file in the root directory, use ```.env example``` like reference


## Start in Dev Mode

To start dev mode and see the app working in your terminal type ```sudo npm run mode:dev:front``` the back and the front

```sudo npm run mode:dev:back``` if you want only develop on backend


## Add other categories
start de app with one of last comands and send a request to ```POST http://localhost:[NODE_PORT || 8080][NODE_API_PREFIX || /api]/categories```
```raw body json { name: [your category name] }``` to create a category


## Run the backend test

Run the backend test to verify the integrity of API ```npm run mode:test``` to prepare the test enviroment and in other terminal run ```npm test``` to run jest

If you have a problem, send a PR or tweetme  [@papscript](https://twitter.com/papscript) ;)
