import * as types from "./index";

export const registerUser = (user) => {
   return {
      type: types.REGISTER_USER,
      user: user,
   };
};

export const loginUser = (user) => {
   return {
      type: types.LOGIN_USER,
      user: user,
   };
};

export const showHideModal = () => {
   return {
      type: types.SHOW_HIDE_MODAL,
   };
};

export const getTodoList = () => {
   return {
      type: types.GET_TODO_LIST,
   };
};

export const getTodoCount = () => {
   return {
      type: types.GET_TODO_COUNT,
   };
};

export const createTodo = (data) => {
   return {
      type: types.CREATE_TODO,
      todo: data,
   };
};

export const updateTodo = (data) => {
   return {
      type: types.UPDATE_TODO_LIST,
      todo: data,
   };
};
export const deleteTodo = (data) => {
   return {
      type: types.DELETE_TODO_LIST,
      todo: data,
   };
};
