import schema from "../schema/user.schema.js";
import service from "../service/user.service.js";
import { validate } from "./validate.js";

const signUp = async (request, response) => {
  try {
    const validRequest = await validate(schema.signUpRequest, request.body);
    const user = await service.signUp(validRequest);
    response.send(validate(schema.userResponse, user));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const login = async (request, response) => {
  try {
    const validRequest = await validate(schema.loginRequest, request.body);
    const user = await service.login(validRequest);
    response.send(validate(schema.userResponse, user));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

export default { signUp, login };
