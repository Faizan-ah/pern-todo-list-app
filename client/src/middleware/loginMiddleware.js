import axios from "axios";
import { LOGIN_URL } from "../utils/urls";
const loginUserApi = axios.create({
   headers: {
      "Content-Type": "application/json",
   },
});

const loginMiddleware = async (data) => {
   const { email, password } = data.user;
   const response = await loginUserApi.post(LOGIN_URL, {
      email,
      password,
   });
   return response;
};

export default loginMiddleware;
