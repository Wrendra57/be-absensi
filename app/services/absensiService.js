const absensiRepository = require("../repositories/absensiRepository");
const userRepository = require("../repositories/userRepository");
const workDateRepository = require("../repositories/workDateRepository");
const formatDate = require("../utils/getDate");
const setAbsensi = async ({ id }) => {
  try {
    const getAll = await userRepository.getListUUID();

    getAll.forEach(async (element) => {
      await absensiRepository.createAbsent({
        uuid: element.uuid,
        statusCheckin: false,
        statusCheckout: false,
        keterangan: "Belum Absen",
        idAbsent: id,
      });
    });
    return;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const checkAbsent = async ({ timeSend, uuid }) => {
  try {
    const timeNow = Date.now();

    // cek params time
    if (!timeSend || timeSend === null) {
      return {
        status: 400,
        message: "QR code tidak valid",
        data: null,
      };
    }
    const jamMasuk = 23 * 60 * 60 * 60;
    const jamPulang = 16 * 60 * 60 * 60;
    const currentTime = new Date(timeNow);
    // console.log(timeSend);

    const date = await formatDate.Date(currentTime);
    // console.log(date);

    const qrCodeTime = new Date(parseInt(timeSend));

    function getMiliSecond(time) {
      const mili =
        time.getHours() * 60 * 60 * 60 +
        time.getMinutes() * 60 * 60 +
        time.getSeconds() * 60;
      return mili;
    }

    const miliCurrentTime = await getMiliSecond(currentTime);
    const miliQrCodeTime = await getMiliSecond(qrCodeTime);

    // check valid qr code 15 seconds()
    if (miliCurrentTime - miliQrCodeTime < 900) {
      // console.log(miliCurrentTime);
      console.log("qr kadaluarsa");
      return {
        status: 400,
        message: "Qr Code Kadaluarsa",
        data: null,
      };
    }

    // check apakah masih aktif
    const validityUuid = await userRepository.getUserByUUID(uuid);
    // console.log(validityUuid.is_enabled);
    if (!validityUuid.is_enabled) {
      return {
        status: 400,
        message: "User sudah tidak aktif",
        data: null,
      };
    }

    // cek adakah absen hari ini
    const statusToday = await workDateRepository.findByDate({ date: date });
    console.log(statusToday[0].id);
    if (statusToday.length === 0) {
      return {
        status: 400,
        message: "data tanggal absen tidak ditemukan",
        data: null,
      };
    }

    // cek apakah cekin atau checkout
    const checkAbsentToday = await absensiRepository.findAbsent({
      uuid: validityUuid.uuid,
      id: statusToday[0].id,
    });
    console.log(checkAbsentToday);

    // apakah ada di data absensi
    if (checkAbsentToday === null) {
      return {
        status: 400,
        message: "data user absen hari ini tidak ditemukan",
        data: null,
      };
    }
    // handle sudah absen
    if (
      checkAbsentToday.statusCheckin === true &&
      checkAbsentToday.statusCheckout === true
    ) {
      return {
        status: 200,
        message: "User telah melakukan absen hari ini",
        data: null,
      };
    }

    // handle checkin
    if (checkAbsentToday.statusCheckin === false) {
      console.log("Check");
      // handle checkin ontim
      if (jamMasuk - miliCurrentTime >= 0) {
        const absent = await absensiRepository.updateAbsent({
          id: checkAbsentToday.id,
          check_in: miliCurrentTime,
          statusCheckin: true,
          keterangan: "check in ontime",
        });
        console.log("Checka");
        console.log(absent);
        return {
          status: 200,
          message: "Berhasil checkin ontime",
          data: absent,
        };
      }

      // handle toolate
      if (jamMasuk - miliCurrentTime < 0) {
        const absent = await absensiRepository.updateAbsent({
          id: checkAbsentToday.id,
          check_in: miliCurrentTime,
          statusCheckin: true,
          keterangan: "check in toolate",
        });
        return {
          status: 200,
          message: "Berhasil checkin toolate",
          data: absent,
        };
      }
    }

    // handle checkout
    if (
      checkAbsentToday.statusCheckin === true &&
      checkAbsentToday.statusCheckout === false
    ) {
      // handle checkout ontime
      if (jamPulang - miliCurrentTime <= 0) {
        const absent = await absensiRepository.updateAbsent({
          id: checkAbsentToday.id,
          check_out: miliCurrentTime,
          statusCheckout: true,
          keterangan: `${checkAbsentToday.keterangan} , check out ontime`,
        });

        return {
          status: 200,
          message: "Berhasil checkout ontime",
          data: absent,
        };
      }

      // handle checkout too fast
      if (jamPulang - miliCurrentTime > 0) {
        const absent = await absensiRepository.updateAbsent({
          id: checkAbsentToday.id,
          check_out: miliCurrentTime,
          statusCheckout: true,
          keterangan: `${checkAbsentToday.keterangan} , check out too fast`,
        });

        return {
          status: 200,
          message: "Berhasil checkout too fast",
          data: absent,
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { setAbsensi, checkAbsent };
