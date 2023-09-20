const { Absensi } = require("../models");
const { Op } = require("sequelize");
const createAbsent = async (params) => {
  try {
    const create = await Absensi.create(params);
    return create;
  } catch (error) {}
};

const findAbsent = async ({ uuid, id }) => {
  try {
    console.log(uuid);
    console.log(id);
    const getAbsent = await Absensi.findOne({
      where: { uuid: uuid, idAbsent: id },
    });

    return getAbsent;
  } catch (error) {}
};

const updateAbsent = async (params) => {
  try {
    let payload = {};
    if (params.check_in) {
      payload = {
        check_in: params.check_in,
        statusCheckin: params.statusCheckin,
        keterangan: params.keterangan,
      };
    } else {
      payload = {
        check_out: params.check_out,
        statusCheckout: params.statusCheckout,
        keterangan: params.keterangan,
      };
    }
    console.log(payload);
    const update = await Absensi.update(payload, { where: { id: params.id } });
    return update;
  } catch (error) {}
};
module.exports = { createAbsent, findAbsent, updateAbsent };
