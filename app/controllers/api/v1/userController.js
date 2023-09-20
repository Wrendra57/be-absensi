const UserService = require("../../../services/userService");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // console.log(email);
    const create = await UserService.createUser({
      email: email,
      password: password,
      name: name,
    });

    return res.status(create.status).json(create);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginSevice = await UserService.login({ email, password });
    return res.status(loginSevice.status).json(loginSevice);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { createUser, login };
