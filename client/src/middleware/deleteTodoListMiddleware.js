import axios from "axios";
import { getAuthToken } from "../utils/localstorage";
import { DELETE_TODO_LIST_URL } from "../utils/urls";

const deleteTodoListMiddleware = async (data) => {
   const headers = {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   };
   const { id } = data.todo;
   const response = await axios.delete(DELETE_TODO_LIST_URL + `/${id}`, {
      headers: headers,
   });
   console.log(response.data);
   return response;
};

export default deleteTodoListMiddleware;
