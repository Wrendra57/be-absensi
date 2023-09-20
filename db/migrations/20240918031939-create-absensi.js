"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Absensis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "uuid",
        },
      },
      check_in: {
        type: Sequelize.STRING,
      },
      check_out: {
        type: Sequelize.STRING,
      },
      statusCheckin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      statusCheckout: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      keterangan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idAbsent: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "WorkDates",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Absensis");
  },
};
