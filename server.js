const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// const axios = require("axios");
// const ejs = require("ejs");

global.Quiz = require("./api/models/quizModel");
const routes = require("./api/routes/quizRoutes");
const { default: axios } = require("axios");

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://user:${process.env.MONGOPW}@cluster0.pos6yfq.mongodb.net/?retryWrites=true&w=majority`
);

const PORT = process.env.PORT || 1337;
const app = express();

// app.set("view-engine", ejs);
// app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

const apiResponse = {
  id: null,
  quizSet: null,
};

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/request", async (req, res) => {
  if (Math.floor(new Date().getTime() / 86400000) === apiResponse.id) {
    console.log("quizSet is on server", apiResponse.id);
    res.json(apiResponse);
  } else {
    Quiz.find(
      { gameID: Math.floor(new Date().getTime() / 86400000) },
      (err, quizSet) => {
        if (err) res.send(err);
        if (quizSet[0] === undefined) {
          console.log(
            "cannot find quizSet in DB, requesting new quiz from external API"
          );
          const getNewQuiz = async () => {
            const { data } = await axios.get(
              "https://the-trivia-api.com/api/questions?limit=5"
            );
            apiResponse.id = Math.floor(new Date().getTime() / 86400000);
            apiResponse.quizSet = data;

            res.json(apiResponse);

            const newQuiz = new Quiz();
            newQuiz.gameID = apiResponse.id;
            newQuiz.q1 = apiResponse.quizSet[0];
            newQuiz.q2 = apiResponse.quizSet[1];
            newQuiz.q3 = apiResponse.quizSet[2];
            newQuiz.q4 = apiResponse.quizSet[3];
            newQuiz.q5 = apiResponse.quizSet[4];
            newQuiz.save((err) => {
              if (err) res.send(err);
              // res.json(quiz);
            });
          };
          getNewQuiz();
        } else {
          const q = quizSet[0];
          console.log("quizset found in database", q.gameID);
          apiResponse.id = q.gameID;
          apiResponse.quizSet = [q.q1, q.q2, q.q3, q.q4, q.q5];
          res.json(apiResponse);
        }
      }
    );
  }
});

app.get("/refresh", async (req, res) => {
  const { data } = await axios.get(
    "https://the-trivia-api.com/api/questions?limit=5"
  );
  apiResponse.id = Math.floor(new Date().getTime() / 86400000);
  apiResponse.quizSet = data;
  console.log(data);
  res.json(data);
});

app.get("/save", async (req, res) => {
  const newQuiz = new Quiz();
  newQuiz.name = "quiz";
  newQuiz.gameID = apiResponse.id;
  let date = new Date();
  date = date.toLocaleDateString();
  newQuiz.date = date;
  newQuiz.q1 = apiResponse.quizSet[0];
  newQuiz.q2 = apiResponse.quizSet[1];
  newQuiz.q3 = apiResponse.quizSet[2];
  newQuiz.q4 = apiResponse.quizSet[3];
  newQuiz.q5 = apiResponse.quizSet[4];
  newQuiz.save((err, quiz) => {
    if (err) res.send(err);
    res.json(quiz);
  });
});

// a 404 "page not found"
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(PORT);

console.log(`Now serving on http://localhost:${PORT}`);
