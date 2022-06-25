import { put, call } from "redux-saga/effects";
import getTodoCountMiddleware from "../middleware/getTodoCountMiddleware";
import * as types from "../actions";

export default function* todoSaga(payload) {
   try {
      const response = yield call(getTodoCountMiddleware);
      yield put({
         type: types.GET_TODO_COUNT_SUCCESS,
         todo: response.data,
      });
   } catch (error) {
      yield put({
         type: types.GET_TODO_COUNT_ERROR,
         error: error.response.data,
      });
   }
}
