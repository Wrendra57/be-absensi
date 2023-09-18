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

module.exports = { createUser };
