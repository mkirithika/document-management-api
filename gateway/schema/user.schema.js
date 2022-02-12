import joi from "joi";

const signUpRequest = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginRequest = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const userResponse = joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().required(),
  token: joi.string().required(),
});

export default { signUpRequest, loginRequest, userResponse };
