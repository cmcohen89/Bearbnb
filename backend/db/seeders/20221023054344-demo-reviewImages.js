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
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'www.fakeimagewebsite.com/images/1'
      },
      {
        reviewId: 2,
        url: 'www.fakeimagewebsite.com/images/2'
      },
      {
        reviewId: 3,
        url: 'www.fakeimagewebsite.com/images/3'
      },
      {
        reviewId: 4,
        url: 'www.fakeimagewebsite.com/images/4'
      },
      {
        reviewId: 5,
        url: 'www.fakeimagewebsite.com/images/5'
      },
      {
        reviewId: 1,
        url: 'www.fakeimagewebsite.com/images/100'
      },
      {
        reviewId: 2,
        url: 'www.fakeimagewebsite.com/images/101'
      },
      {
        reviewId: 3,
        url: 'www.fakeimagewebsite.com/images/102'
      },
      {
        reviewId: 4,
        url: 'www.fakeimagewebsite.com/images/103'
      },
      {
        reviewId: 5,
        url: 'www.fakeimagewebsite.com/images/104'
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
    await queryInterface.bulkDelete('ReviewImages', {
      reviewId: [1, 2, 3, 4, 5]
    })
  }
};
