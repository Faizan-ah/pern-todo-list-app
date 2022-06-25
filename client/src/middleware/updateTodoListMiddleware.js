import axios from "axios";
import { getAuthToken } from "../utils/localstorage";
import { UPDATE_TODO_LIST_URL } from "../utils/urls";
const updateTodoListUserApi = axios.create({
   headers: {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   },
});

const updateTodoListMiddleware = async (data) => {
   const { id, description, completed } = data.todo;
   const headers = {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   };
   const response = await axios.put(
      UPDATE_TODO_LIST_URL + `/${id}`,
      {
         description,
         completed,
      },
      { headers: headers }
   );
   console.log(response.data);
   return response;
};

export default updateTodoListMiddleware;
