const { v4: uuidv4 } = require("uuid");
const UserRepository = require("../repositories/userRepository");

const Generate = async () => {
  try {
    const userId = await uuidv4();

    const checkUuidUsers = await UserRepository.getUserByUUID(userId);

    if (checkUuidUsers !== null) {
      console.log("gagal");
      Generate();
    } else {
      return userId;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Generate,
};
