import { QUIZ_ACTION_TYPES } from "./quiz.types";

export const QUIZ_INITIAL_STATE = {
  currentQuestionIndex: 0,
  questions: [],
  questionsLoading: false,
  errorFetchQuiz: null,
  answers: {},
};

export const quizReducer = (state = QUIZ_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case QUIZ_ACTION_TYPES.FETCH_QUESTIONS_START:
      return { ...state, questionsLoading: true };
    case QUIZ_ACTION_TYPES.FETCH_QUESTIONS_SUCCESS:
      return { ...state, questions: payload, questionsLoading: false };
    case QUIZ_ACTION_TYPES.FETCH_QUESTIONS_FAILED:
      return { ...state, errorFetchQuiz: payload, questionsLoading: false };
    case QUIZ_ACTION_TYPES.UPDATE_CURRENT_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: payload };
    case QUIZ_ACTION_TYPES.SELECT_ANSWER:
      const prevStateAnswer = state.answers;
      return { ...state, answers: { ...prevStateAnswer, ...payload } };
    case QUIZ_ACTION_TYPES.RESET_QUESTIONS:
      return { ...QUIZ_INITIAL_STATE };
    default:
      return state;
  }
};
