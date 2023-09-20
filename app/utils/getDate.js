const Date = async (date) => {
  try {
    let tanggal = "";
    let bulan = "";

    let tgl = date.getDate();
    let bln = date.getMonth();
    let tahun = date.getFullYear();

    if (tgl < 10) {
      tanggal = `0${tgl}`;
    } else {
      tanggal = `${tgl}`;
    }

    if (bln < 10) {
      bulan = `0${bln}`;
    } else {
      bulan = `${bln}`;
    }
    return `${tahun}-${bulan}-${tanggal}`;
  } catch (error) {}
};

module.exports = {Date};
