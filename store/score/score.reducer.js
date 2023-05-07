import { SCORE_ACTION_TYPES } from "./score.types";
export const SCORE_INITIAL_STATE = {
  history: [],
  currentScore: 0,
  currentDurationTest: "",
  currentUnansweredQuestions: 0,
  currentCorrectAnswers: 0,
  currentWrongAnswers: 0,
  currentAccuracy: 0,
  highScore: 0,
};
export const scoreReducer = (state = SCORE_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SCORE_ACTION_TYPES.ADD_SCORE_HISTORY:
      state.history.push(payload);
      const highScore = state.history.reduce((highScores, item) => {
        return item.score > highScores ? item.score : highScores; // Find the highest score
      }, 0);
      return {
        ...state,
        currentScore: payload.score,
        currentDurationTest: payload.durationTest,
        currentUnansweredQuestions: payload.unAnsweredQuestions,
        currentCorrectAnswers: payload.correctAnswer,
        currentWrongAnswers: payload.wrongAnswer,
        currentAccuracy: payload.accuracy,
        highScore,
      };
    case SCORE_ACTION_TYPES.RESET_SCORE_HISTORY:
      return { ...SCORE_INITIAL_STATE };
    default:
      return state;
  }
};
