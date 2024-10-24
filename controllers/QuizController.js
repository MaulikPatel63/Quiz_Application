const Quiz = require("../models/Quiz.js");
const User = require("../models/User.js");

const QuizAdd = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const newQuiz = new Quiz({
      title,
      description,
      questions,
    });

    await newQuiz.save();
    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const QuizsGet = async (req, res) => {
  try {
    const quizes = await Quiz.find();
    if (!quizes) {
      res
        .status(404)
        .json({ success: false, message: "Quize data not found!" });
    }
    res.status(200).json({ success: true, count: quizes.length, data: quizes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const QuizGet = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const QuizUpdate = async (req, res) => {
  try {
    const { title, description, questions, text, choices, correctAnswer } =
      req.body;
    const questionId = req.query.questionId;

    // Find the quiz by its ID
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // If questionId is provided, update only the specific question
    if (questionId) {
      const question = quiz.questions.id(questionId);

      if (!question) {
        return res
          .status(404)
          .json({ success: false, message: "Question not found" });
      }

      // Update the specific question's fields (if provided)
      if (text) question.text = text;
      if (choices) question.choices = choices;
      if (correctAnswer) question.correctAnswer = correctAnswer;
    } else {
      // Update the entire quiz-level fields (if provided)
      quiz.title = title || quiz.title;
      quiz.description = description || quiz.description;
      quiz.questions = questions || quiz.questions;
    }

    // Save the updated quiz
    await quiz.save();

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const QuizDelete = async (req, res) => {
  try {
    const questionId = req.query.questionId;
    const quiz = await Quiz.findById(req.params.id);

    if (questionId) {
      // Find the index of the specific question
      const questionIndex = quiz.questions.findIndex(
        (q) => q._id.toString() === questionId
      );

      if (questionIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      // Remove the specific question using splice
      quiz.questions.splice(questionIndex, 1);

      // Save the updated quiz
      await quiz.save();

      return res.status(200).json({
        success: true,
        message: "Question removed",
        data: quiz,
      });
    }

    // If no questionId is provided, delete the entire quiz
    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      message: "Quiz removed",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { QuizAdd, QuizsGet, QuizDelete, QuizUpdate, QuizGet };
