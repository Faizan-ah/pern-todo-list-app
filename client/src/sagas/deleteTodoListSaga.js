import { put, call } from "redux-saga/effects";
import deleteTodoListMiddleware from "../middleware/deleteTodoListMiddleware";
import * as types from "../actions";

export default function* todoSaga(payload) {
   try {
      const response = yield call(deleteTodoListMiddleware, payload);
      yield put({
         type: types.DELETE_TODO_LIST_SUCCESS,
         todo: response.data,
      });
   } catch (error) {
      yield put({
         type: types.DELETE_TODO_LIST_ERROR,
         error: error.response.data,
      });
   }
}
