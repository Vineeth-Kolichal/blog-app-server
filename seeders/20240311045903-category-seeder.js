'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        name: "Node js",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Flutter",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Golang",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", {}, null)
  }
};
