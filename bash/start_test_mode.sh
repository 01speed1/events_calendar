#!/bin/bash
npm i

NODE_ENV='test' nodemon app.js
sudo docker-compose up -d

