import { QUIZ_ACTION_TYPES } from "./quiz.types";

import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchQuestionsStart = () => createAction(QUIZ_ACTION_TYPES.FETCH_QUESTIONS_START);

export const fetchQuestionsSuccess = (questionsArr) => createAction(QUIZ_ACTION_TYPES.FETCH_QUESTIONS_SUCCESS, questionsArr);

export const fetchQuestionsFailed = (error) => createAction(QUIZ_ACTION_TYPES.FETCH_QUESTIONS_FAILED, error);
export const updateCurrentQuestionIndex = (newIndexQuestion) => createAction(QUIZ_ACTION_TYPES.UPDATE_CURRENT_QUESTION_INDEX, newIndexQuestion);
export const selectAnswer = (answer) => createAction(QUIZ_ACTION_TYPES.SELECT_ANSWER, answer);
export const resetQuizInformation = () => createAction(QUIZ_ACTION_TYPES.RESET_QUESTIONS);
