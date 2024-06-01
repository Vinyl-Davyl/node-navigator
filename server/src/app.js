const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

// allowing cross origin request from any site on the internet
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// versioning api eg ./v1/launches
app.use("/v1", api);
// app.use("/v2", V2Router);

// Serves index.html for server run 8000 to run client code on browser
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
