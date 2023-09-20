const workDateRepository = require("../repositories/workDateRepository");
const formatDate = require("../utils/getDate");
const setDate = async () => {
  try {
    console.log("jalan");
    const date = await Date.now();
    console.log("date ====>" + date);
    const stringDate = new Date(date);
    console.log("stringDate ====>" + stringDate);
    const formatDatea = await formatDate.Date(stringDate);
    console.log("formatDate");
    console.log(formatDatea);
    const create = await workDateRepository.createDate({
      date: date,
      tanggal: formatDatea,
      jumlah: 0,
    });
    console.log("create");
    console.log(create);
    return create;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = {
  setDate,
};
