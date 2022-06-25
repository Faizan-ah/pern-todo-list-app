import * as types from "../actions";

const initialState = {
   todo: null,
   loading: false,
   user: "",
   error: "",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case types.GET_TODO_COUNT:
         return {
            ...state,
            loading: true,
            error: "",
         };
      case types.GET_TODO_COUNT_SUCCESS:
         return {
            ...state,
            todo: action.todo,
            loading: false,
         };
      case types.GET_TODO_COUNT_ERROR:
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
