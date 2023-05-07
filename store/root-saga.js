import { all, call } from "redux-saga/effects";
import { quizSaga } from "./quiz/quiz.saga";
export function* rootSaga() {
  yield all([call(quizSaga)]);
}
