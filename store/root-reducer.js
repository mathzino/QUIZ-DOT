import { combineReducers } from "redux";

import { quizReducer } from "./quiz/quiz.reducer";
import { scoreReducer } from "./score/score.reducer";

export const rootReducer = combineReducers({
  quiz: quizReducer,
  score: scoreReducer,
});
