const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { router: codeRouter } = require("./route.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8000;

app.use("/code", codeRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
