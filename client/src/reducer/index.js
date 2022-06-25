import { combineReducers } from "redux";
import registerReducer from "./register";
import loginReducer from "./login";
import getTodo from "./getTodo";
import updateTodo from "./updateTodo";
import createTodo from "./createTodo";
import deleteTodo from "./deleteTodo";
import getTodoCount from "./getTodoCount";
const rootReducer = combineReducers({
   registerReducer,
   loginReducer,
   getTodo,
   updateTodo,
   createTodo,
   deleteTodo,
   getTodoCount,
});

export default rootReducer;
