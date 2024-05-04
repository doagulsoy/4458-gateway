const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = 3001;

const authURL = process.env.AUTH_URL;
const studentURL = process.env.STUDENT_URL;

// get token from auth service
const axios = require("axios");
app.use(express.json());

app.post("/login", async (req, res) => {
  console.log("Request body in gateway:", req.body); // Debugging

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${authURL}/auth/login`, req.body, config);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in /login endpoint:", error); 
    res.status(400).json({ message: error.message });
  }
});
//signup
app.post("/signup", async (req, res) => {
  console.log("Request body in gateway:", req.body); // Debugging

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${authURL}/auth/signup`, req.body, config);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in /signup endpoint:", error); 
    res.status(400).json({ message: error.message });
  }
}
);

app.listen(4000, () => {
  console.log("Gateway is running on port 4000");
});

// get student by id from student service
app.get("/student/:id", async (req, res) => {
  try {
    const response = await axios.get(studentURL + "/student/" + req.params.id);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// add addCourse to student service
app.post("/addCourse", async (req, res) => {
  try {
    const response = await axios.post(studentURL + "/student/addCourse", req.body);
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
app.get("/courses", async (req, res) => {
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

if (process.env.VERCEL == "1") {
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
