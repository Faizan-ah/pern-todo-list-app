import * as types from "../actions";

const initialState = {
   todo: null,
   loading: false,
   user: "",
   error: "",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case types.CREATE_TODO:
         return {
            ...state,
            loading: true,
            error: "",
         };
      case types.CREATE_TODO_SUCCESS:
         return {
            ...state,
            todo: action.todo,
            loading: false,
         };
      case types.CREATE_TODO_ERROR:
         return {
            ...state,
            error: action.error,
            loading: false,
         };
      default:
         return state;
   }
};
