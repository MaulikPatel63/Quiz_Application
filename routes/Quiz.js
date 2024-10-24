const router = require("express").Router();
const path = require("path");
const Joi = require("joi");

const {
  QuizAdd,
  QuizsGet,
  QuizDelete,
  QuizUpdate,
  QuizGet,
} = require("../controllers/QuizController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware } = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

//? Quiz router
router.post("/quiz-add", AddValidation, QuizAdd);
router.get("/quiz-get", QuizsGet);
router.get("/quiz-get/:id", QuizGet);
router.put("/quiz-update/:id", UpdateValidation, QuizUpdate);
router.delete("/quiz-delete/:id", QuizDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters long",
    }),

    description: Joi.string().min(5).max(500).required().messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 5 characters long",
    }),

    questions: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().min(3).required().messages({
            "string.empty": "Question text is required",
          }),
          choices: Joi.array().items(Joi.string()).min(2).required().messages({
            "array.min": "Each question must have at least 2 choices",
          }),
          correctAnswer: Joi.string().required().messages({
            "string.empty": "Correct answer is required",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "At least one question is required",
      }),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).optional().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters long",
    }),

    description: Joi.string().min(5).max(500).optional().messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 5 characters long",
    }),
    text: Joi.string().min(3).optional().messages({
      "string.empty": "Question text is required",
    }),
    choices: Joi.array().items(Joi.string()).min(2).optional().messages({
      "array.min": "Each question must have at least 2 choices",
    }),
    correctAnswer: Joi.string().optional().messages({
      "string.empty": "Correct answer is required",
    }),
    questions: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().min(3).optional().messages({
            "string.empty": "Question text is required",
          }),
          choices: Joi.array().items(Joi.string()).min(2).optional().messages({
            "array.min": "Each question must have at least 2 choices",
          }),
          correctAnswer: Joi.string().optional().messages({
            "string.empty": "Correct answer is required",
          }),
        })
      )
      .min(1)
      .optional()
      .messages({
        "array.min": "At least one question is required",
      }),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
