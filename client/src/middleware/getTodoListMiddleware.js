import axios from "axios";
import { getAuthToken } from "../utils/localstorage";
import { GET_TODO_LIST_URL } from "../utils/urls";

const getTodoListMiddleware = async () => {
   const headers = {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   };
   const response = await axios.get(GET_TODO_LIST_URL, {
      headers: headers,
   });
   console.log(response.data);
   return response;
};
export default getTodoListMiddleware;
