const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
const PORT = 3001;

const authURL = process.env.AUTH_URL;
const studentURL = process.env.STUDENT_URL;

// get token from auth service
const axios = require("axios");
app.get("/auth", async (req, res) => {
  try {
    const response = await axios.post(authURL + "/auth", req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all students from student service
app.get("/students", async (req, res) => {
  try {
    const response = await axios.get(studentURL + "/students");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get student by id from student service
app.get("/students/:id", async (req, res) => {
  try {
    const response = await axios.get(studentURL + "/students/" + req.params.id);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// add addCourse to student service
app.post("/addCourse", async (req, res) => {
  try {
    const response = await axios.post(studentURL + "/students/addCourse", req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

//add instructor to student service
app.post("/addInstructors", async (req, res) => {
  try {
    const response = await axios.post(studentURL + "/instructors", req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});


// add course to student service
app.post("/courses", async (req, res) => {
  try {
    const response = await axios.post(studentURL + "/courses", req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});






/**
 *
 * /tickets:
 *   get:
 *     summary: Retrieve a list of tickets
 *     description: Endpoint to get information about all users. Requires JWT authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ticket'
 *       401:
 *         description: Unauthorized access - No token provided or token is invalid
 */
//get all tickets from database with authentification
app.get("/", async (req, res) => {
  res.status(200).send("API Server is running!");
});

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(dbConnectionMiddleware);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCssUrl: CSS_URL,
  })
);
app.use("/auth", authenticationRouter);

if (process.env.VERCEL == "1") {
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
