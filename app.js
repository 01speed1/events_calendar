require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./config/database");

const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

require("./routes")(app);

const port = process.env.NODE_PORT || 8080

app.listen(port, () =>{
  console.log('server start in', process.env.NODE_ENV)
  console.log(`Server running on port ${port}`)}
);