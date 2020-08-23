#!/bin/bash
npm i

trap 'kill 0' EXIT
NODE_ENV='development' nodemon app.js
sudo docker-compose up -d
wait

