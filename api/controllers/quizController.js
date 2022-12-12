const mongoose = require("mongoose");
const Quiz = mongoose.model("Quiz");

exports.readQuiz = (req, res) => {
  Quiz.find({}, (err, quiz) => {
    if (err) res.send(err);
    res.json(quiz);
  });
};

exports.createQuiz = (req, res) => {
  const newQuiz = new Quiz(req);
  newQuiz.save((err, quiz) => {
    if (err) res.send(err);
    res.json(quiz);
  });
};

exports.destroyQuiz = (req, res) => {
  Quiz.deleteMany({ name: "quiz" }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Quiz successfully deleted",
    });
  });
};
