import { createAction } from "../../utils/reducer/reducer.utils";
import { SCORE_ACTION_TYPES } from "./score.types";
export const submitScore = (result) => createAction(SCORE_ACTION_TYPES.ADD_SCORE_HISTORY, result);
export const resetScoreHistory = () => createAction(SCORE_ACTION_TYPES.RESET_SCORE_HISTORY);
