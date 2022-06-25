import axios from "axios";
import { getAuthToken } from "../utils/localstorage";
import { CREATE_TODO_URL } from "../utils/urls";
const createTodoUserApi = axios.create({
   headers: {
      "Content-Type": "application/json",
      "x-auth-token": getAuthToken(),
   },
});

const createTodoMiddleware = async (data) => {
   const { description, completed } = data.todo;
   const response = await createTodoUserApi.post(CREATE_TODO_URL, {
      description,
      completed,
   });
   console.log(response.data);
   return response;
};

export default createTodoMiddleware;
