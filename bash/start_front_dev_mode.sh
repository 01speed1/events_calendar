#!/bin/bash
npm i
(cd frontend && npm i )
trap 'kill 0' EXIT
NODE_ENV='development' nodemon app.js &
sudo docker-compose up -d &
(cd frontend && npm start)
wait