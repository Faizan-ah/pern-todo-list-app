import { put, call } from "redux-saga/effects";
import getTodoListMiddleware from "../middleware/getTodoListMiddleware";
import * as types from "../actions";

export default function* todoSaga(payload) {
   try {
      const response = yield call(getTodoListMiddleware);
      yield put({
         type: types.GET_TODO_LIST_SUCCESS,
         todo: response.data,
      });
   } catch (error) {
      yield put({
         type: types.GET_TODO_LIST_ERROR,
         error: error.response.data,
      });
   }
}
