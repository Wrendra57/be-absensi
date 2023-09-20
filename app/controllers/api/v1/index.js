/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

// const postController = require("./postController");
const userController = require("./userController");
const workDate = require("./workDateController");
const absensiController = require("./absensiController");
module.exports = {
  userController,
  workDate,
  absensiController,
};
