const absensiService = require("../../../services/absensiService");

const checkAbsenC = async (req, res) => {
  try {
    const timeSend = req.params.time;
    const absen = await absensiService.checkAbsent({
      timeSend: timeSend,
      uuid: req.user.uuid,
    });
    return res.status(absen.status).json(absen);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { checkAbsenC };
