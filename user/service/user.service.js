import { generateToken, generateSalt, hashPassword } from "./utils.js";
import User from "./user.modal.js";

const signUp = async (call, send) => {
  try {
    // Create user and token
    const userData = call.request;
    userData.salt = generateSalt(); // unique salt is generated for each user
    userData.password = hashPassword(userData.password, userData.salt); // Password hashed and stored in DB
    const insertedUser = await User.create(userData);
    const tokenObj = getTokenData(insertedUser);
    send(null, {
      ...tokenObj,
      token: generateToken(tokenObj),
    });
  } catch (error) {
    send(error);
  }
};

const login = async (call, send) => {
  // Validate user and create token
  try {
    const requestData = call.request;
    const userData = await User.findOne({ email: call.request.email });

    if (!userData) {
      return send({ statusCode: 404, message: "User not found" });
    }
    const requestPassword = hashPassword(requestData.password, userData.salt);

    if (requestPassword !== userData.password) {
      return send({ statusCode: 401, message: "Incorrect email or password" });
    }
    const tokenObj = getTokenData(userData);
    send(null, {
      ...tokenObj,
      token: generateToken(tokenObj),
    });
  } catch (error) {
    send(error);
  }
};

const getTokenData = (userData) => {
  return {
    id: userData._id.toString(),
    name: userData.name,
    email: userData.email,
  };
};

export default {
  signUp,
  login,
};
