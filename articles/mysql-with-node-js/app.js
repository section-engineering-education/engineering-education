let express = require("express");
let mysql = require("mysql");
let app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
