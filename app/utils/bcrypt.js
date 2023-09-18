const bcrypt = require("bcrypt");
require("dotenv").config();
const encryptPassword = async (password) => {
  try {
    const encrypt = await bcrypt.hash(password, parseInt(process.env.SALT));
    // console.log(decode);
    return encrypt;
  } catch (error) {
    return {
      status: 500,
      messsage: error.message,
      data: null,
    };
  }
};

const comparePasswords = async (password, encryptedPasswords) => {
  try {
    const compare = await bcrypt.compare(password, encryptedPasswords);
    // console.log(compare);
    return compare;
  } catch (error) {
    return {
      status: 500,
      messsage: error.message,
      data: null,
    };
  }
};

module.exports = {
  encryptPassword,
  comparePasswords,
};
