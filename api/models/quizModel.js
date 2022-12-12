const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema(
  {
    gameID: {
      type: Number,
    },
    q1: {
      type: Object,
    },
    q2: {
      type: Object,
    },
    q3: {
      type: Object,
    },
    q4: {
      type: Object,
    },
    q5: {
      type: Object,
    },
  },
  { collection: "quiz" }
);

module.exports = mongoose.model("Quiz", QuizSchema);
