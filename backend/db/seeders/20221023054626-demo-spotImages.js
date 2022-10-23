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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'www.fakeimagewebsite.com/images/6',
        preview: true
      },
      {
        spotId: 2,
        url: 'www.fakeimagewebsite.com/images/7',
        preview: true
      },
      {
        spotId: 3,
        url: 'www.fakeimagewebsite.com/images/8',
        preview: true
      },
      {
        spotId: 4,
        url: 'www.fakeimagewebsite.com/images/9',
        preview: true
      },
      {
        spotId: 5,
        url: 'www.fakeimagewebsite.com/images/10',
        preview: true
      },
      {
        spotId: 1,
        url: 'www.fakeimagewebsite.com/images/200',
        preview: false
      },
      {
        spotId: 2,
        url: 'www.fakeimagewebsite.com/images/201',
        preview: false
      },
      {
        spotId: 3,
        url: 'www.fakeimagewebsite.com/images/202',
        preview: false
      },
      {
        spotId: 4,
        url: 'www.fakeimagewebsite.com/images/203',
        preview: false
      },
      {
        spotId: 5,
        url: 'www.fakeimagewebsite.com/images/204',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('SpotImages', {
      spotId: [1, 2, 3, 4, 5]
    })
  }
};
