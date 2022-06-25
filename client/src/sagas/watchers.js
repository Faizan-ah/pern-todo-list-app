import { takeLatest } from "redux-saga/effects";
import registerSaga from "./registerSaga";
import loginSaga from "./loginSaga";
import deleteTodoListSaga from "./deleteTodoListSaga";
import getTodoListSaga from "./getTodoListSaga";
import updateTodoListSaga from "./updateTodoListSaga";
import createTodoSaga from "./createTodoSaga";
import getTodoCountSaga from "./getTodoCountSaga";
import * as types from "../actions";

export default function* watchEverything() {
   yield takeLatest(types.REGISTER_USER, registerSaga);
   yield takeLatest(types.LOGIN_USER, loginSaga);
   yield takeLatest(types.GET_TODO_LIST, getTodoListSaga);
   yield takeLatest(types.UPDATE_TODO_LIST, updateTodoListSaga);
   yield takeLatest(types.CREATE_TODO, createTodoSaga);
   yield takeLatest(types.DELETE_TODO_LIST, deleteTodoListSaga);
   yield takeLatest(types.GET_TODO_COUNT, getTodoCountSaga);
}
