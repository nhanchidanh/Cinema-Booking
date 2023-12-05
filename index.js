const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const useragent = require("express-useragent");
const routes = require("./src/routes");
const https = require("https");
const fs = require("fs");
var path = require("path");
require("dotenv").config();
require("./src/config/redis");
const NetworkUtil = require("./src/utils/network");

const key = fs.readFileSync(path.resolve("ssl/private.key"));
const cert = fs.readFileSync(path.resolve("ssl/certificate.crt"));
const options = {
  key: key,
  cert: cert,
};

console.log(`mobile host`, NetworkUtil.getMoblieHost("success"));

const app = express();
const httpsServer = https.createServer(options, app);
const port = process.env.PORT;

// connect to database
const db = require("./src/config/database");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/resources", "views"));

db.sync({ alter: true });
// db.sync();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));
// routes
routes(app);

app.get("/verify", (req, res) => {
  res.render("Verify");
});

httpsServer.listen(3005);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
