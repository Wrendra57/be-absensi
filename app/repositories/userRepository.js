const { User } = require("../models");
const { Op } = require("sequelize");
const getUserByUUID = async (uuid) => {
  try {
    const getUser = await User.findOne({ where: { uuid: uuid } });

    return getUser;
  } catch (error) {
    // console.log("repositoryadwadwawd");
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getUserByEmail = async (email) => {
  try {
    const getUser = await User.findOne({ where: { email: email } });
    // console.log("repositoryadwadwawd");
    // console.log(getUser);
    return getUser;
  } catch (error) {
    console.log("repositoryadwadwawd");
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const createUser = async (params) => {
  try {
    const createUser = await User.create(params);

    return createUser;
  } catch (error) {
    console.log("repository");
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const destroyAll = async (params) => {
  try {
    const adelete = await User.destroy({
      where: {
        email: { [Op.substring]: params },
      },
    });

    return adelete;
  } catch (error) {}
};

const getListUUID = async () => {
  try {
    const getAll = await User.findAll({
      where: { role: "member" },
      attributes: ["uuid"],
    });
    return getAll;
  } catch (error) {}
};

module.exports = {
  createUser,
  getUserByUUID,
  getUserByEmail,
  destroyAll,
  getListUUID,
};
