import { takeLatest, all, call, put } from "redux-saga/effects";
import axios from "axios";

import { fetchQuestionsFailed, fetchQuestionsSuccess } from "./quiz.action";

import { QUIZ_ACTION_TYPES } from "./quiz.types";

async function getQuestion() {
  const res = await axios.get("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean");
  return res.data.results;
}

export function* fetchQuestionsAsync() {
  try {
    const questionsArr = yield call(getQuestion);
    yield put(fetchQuestionsSuccess(questionsArr));
  } catch (error) {
    yield put(fetchQuestionsFailed(error));
  }
}

export function* onFetchQuestions() {
  yield takeLatest(QUIZ_ACTION_TYPES.FETCH_QUESTIONS_START, fetchQuestionsAsync);
}

export function* quizSaga() {
  yield all([call(onFetchQuestions)]);
}
