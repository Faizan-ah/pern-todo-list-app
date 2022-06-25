import axios from "axios";
import { REGISTER_URL } from "../utils/urls";
const registerUserApi = axios.create({
   headers: {
      "Content-Type": "application/json",
   },
});

const registerMiddleware = async (data) => {
   const { email, password } = data.user;
   const response = await registerUserApi.post(REGISTER_URL, {
      email,
      password,
   });
   console.log(response.data);
   return response;
};

export default registerMiddleware;
