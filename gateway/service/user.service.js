import client from "../client/user.client.js";

const signUp = (signUpInfo) => {
  return new Promise((resolve, reject) => {
    client.signUp(signUpInfo, (error, user) => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    });
  });
};

const login = (loginInfo) => {
  return new Promise((resolve, reject) => {
    client.login(loginInfo, (error, user) => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    });
  });
};

export default { signUp, login };
