const workDateService = require("../../../services/workDateService");
const absensiService = require("../../../services/absensiService");
const setDate = async () => {
  try {
    const createDate = await workDateService.setDate();
    console.log("createDate.date");
    console.log(createDate.date);
    const crateAbsent = await absensiService.setAbsensi({
      id: createDate.id,
    });
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { setDate };
