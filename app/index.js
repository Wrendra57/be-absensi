/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");

const cors = require("cors");
const port = process.env.PORT || 8000;

const app = express();

const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");
// SWAGGER
const swaggerOptions = require("./utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);
/** Install request logger */
app.use(morgan("dev"));
app.use(cors(false));

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.single("avatar"));
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/** Install Router */
app.use(router);

// const app = require("../app");

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;
