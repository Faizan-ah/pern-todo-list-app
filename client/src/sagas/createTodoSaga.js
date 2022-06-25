import { put, call } from "redux-saga/effects";
import createTodoMiddleware from "../middleware/createTodoMiddleware";
import * as types from "../actions";

export default function* todoSaga(payload) {
   try {
      const response = yield call(createTodoMiddleware, payload);
      yield put({
         type: types.CREATE_TODO_SUCCESS,
         todo: response.data,
      });
   } catch (error) {
      yield put({
         type: types.CREATE_TODO_ERROR,
         error: error.response.data,
      });
   }
}
