const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const Route = require("./Route/api");

const app = express();

app.use(
  cors({
    origin: true,
    methods: "GET,PUT,POST",
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var distDir = path.resolve(__dirname, "./dist");
app.use(express.static(distDir));
app.use("/api", Route);

app.get("*", function(req, res, next) {
  var mainTemplateFile = path.join(distDir, "index.html"); // Path to main app template
  res.sendFile(mainTemplateFile);
});

const port = process.env.PORT || 9527;
app.set(port, port);

var server = http.createServer(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
