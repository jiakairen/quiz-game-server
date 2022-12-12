const quizBuilder = require("../controllers/quizController");

module.exports = (app) => {
  app
    .route("/quiz")
    .get(quizBuilder.readQuiz)
    .post(quizBuilder.createQuiz)
    .delete(quizBuilder.destroyQuiz);
};
