const signUp = (signUpInfo) => {
  try {
    console.log(signUpInfo);
  } catch (error) {
    throw error;
  }
};

const login = (loginInfo) => {
  try {
    console.log(loginInfo);
  } catch (error) {
    throw error;
  }
};

export default { signUp, login };
