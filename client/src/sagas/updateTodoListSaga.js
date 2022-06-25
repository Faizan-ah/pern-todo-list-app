import { put, call } from "redux-saga/effects";
import updateTodoListMiddleware from "../middleware/updateTodoListMiddleware";
import * as types from "../actions";

export default function* todoSaga(payload) {
   try {
      const response = yield call(updateTodoListMiddleware, payload);
      yield put({
         type: types.UPDATE_TODO_LIST_SUCCESS,
         todo: response.data,
      });
   } catch (error) {
      yield put({
         type: types.UPDATE_TODO_LIST_ERROR,
         error: error.response.data,
      });
   }
}
