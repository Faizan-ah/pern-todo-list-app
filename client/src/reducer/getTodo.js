import * as types from "../actions";

const initialState = {
   todo: [],
   loading: false,
   user: "",
   error: "",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case types.GET_TODO_LIST:
         return {
            ...state,
            loading: true,
            error: "",
         };
      case types.GET_TODO_LIST_SUCCESS:
         return {
            ...state,
            todo: action.todo,
            loading: false,
         };
      case types.GET_TODO_LIST_ERROR:
         console.log(state);
         return {
            ...state,
            error: action.error,
            loading: false,
         };
      default:
         return state;
   }
};
