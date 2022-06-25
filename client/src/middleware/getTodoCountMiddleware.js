import axios from "axios";
import { getAuthToken } from "../utils/localstorage";
import { GET_TODO_COUNT_URL } from "../utils/urls";

const getTodoCountMiddleware = async () => {
   const headers = {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   };
   const response = await axios.get(GET_TODO_COUNT_URL, { headers: headers });
   console.log(response.data);
   return response;
};

export default getTodoCountMiddleware;
