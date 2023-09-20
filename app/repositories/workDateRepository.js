const { WorkDate } = require("../models");
const { Op } = require("sequelize");

const createDate = async (params) => {
  try {
    const create = await WorkDate.create(params);

    return create;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const findByDate = async ({ date }) => {
  try {
    const find = await WorkDate.findAll({
      where: { tanggal: { [Op.substring]: date } },
    });
    console.log("find ====>>>>" + find[0].id);
    return find;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { createDate, findByDate };
