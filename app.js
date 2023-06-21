const express = require("express");
const app = express();
require("express-async-errors");
require("dotenv").config();
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");
const connectDB = require("./db/connectDB");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");
const { prototype } = require("./errors/unauthorized");
const yaml = require("js-yaml");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8"));

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use("/api/v1/", authRoute);
app.use("/api/v1/jobs", authMiddleware, jobsRoute);
app.use(errorHandler);

const url = process.env.MONGO_URI;
let port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// "start": "npx nodemon app.js"
