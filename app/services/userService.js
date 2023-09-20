const UserRepository = require("../repositories/userRepository");
const Uuid = require("../utils/uuid");
const Bcrypt = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/constant");
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

const login = async ({ email, password }) => {
  try {
    console.log("login service");
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

    const getUser = await UserRepository.getUserByEmail(email);
    if (!getUser) {
      return {
        status: 404,
        message: "Email tidak terdaftar",
        data: null,
      };
    }
    const comparePassword = await Bcrypt.comparePasswords(
      password,
      getUser.password
    );
    if (!comparePassword) {
      return {
        status: 400,
        message: "Passwords salah",
        data: null,
      };
    }

    const token = jwt.sign(
      {
        uuid: getUser.uuid,
        email: getUser.email,
      },
      JWT.SECRET,
      {
        expiresIn: JWT.EXPIRED,
      }
    );
    return {
      status: 200,
      message: "Success Logged in",
      data: { token: token },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { createUser, login };
