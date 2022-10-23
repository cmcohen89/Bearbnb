'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
        {
          spotId: 1,
          userId: 5,
          startDate: "2023-01-01",
          endDate: "2023-01-08"
        },
        {
          spotId: 2,
          userId: 4,
          startDate: "2023-02-01",
          endDate: "2023-02-08"
        },
        {
          spotId: 3,
          userId: 5,
          startDate: "2023-03-01",
          endDate: "2023-03-08"
        },
        {
          spotId: 4,
          userId: 2,
          startDate: "2023-04-01",
          endDate: "2023-04-08"
        },
        {
          spotId: 5,
          userId: 1,
          startDate: "2023-05-01",
          endDate: "2023-05-08"
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', {
      startDate: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01']
    })
  }
};
