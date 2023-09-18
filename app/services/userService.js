const UserRepository = require("../repositories/userRepository");
const Uuid = require("../utils/uuid");
const Bcrypt = require("../utils/bcrypt");
const createUser = async ({ email, name, password }) => {
  try {
    if (name === "" || !name) {
      return {
        status: 400,
        message: "Nama tidak boleh kosong",
        data: null,
      };
    }
    if (email === "" || !email) {
      return {
        status: 400,
        message: "Email tidak boleh kosong",
        data: null,
      };
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return {
          status: 400,
          message: "Email tidak valid",
          data: null,
        };
      }
    }
    if (password === "" || !password) {
      return {
        status: 400,
        message: "Password tidak boleh kosong",
        data: null,
      };
    }

    const emailCheck = await UserRepository.getUserByEmail(email);
    if (emailCheck) {
      return {
        status: 400,
        message: "Email already exists",
        data: null,
      };
    }

    const uuid = await Uuid.Generate();

    const hashedPassword = await Bcrypt.encryptPassword(password);

    const create = await UserRepository.createUser({
      uuid: uuid,
      email: email,
      password: hashedPassword,
      name: name,
      is_enabled: true,
      role: "member",
    });

    user = JSON.parse(JSON.stringify(create));
    delete user.password;
    return {
      status: 200,
      message: "succses create data",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { createUser };
