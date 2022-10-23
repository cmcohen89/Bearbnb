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
   await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Nowhere Lane',
        city: 'Nowhereville',
        state: 'Nebraska',
        country: 'United States',
        lat: 23.4547,
        lng: 85.3447,
        name: "Nowhere's Lodge",
        description: "Come hang out at the only lodge in Nowhereville!",
        price: 149.99
      },
      {
        ownerId: 2,
        address: '124 Nowhere Lane',
        city: 'Nowhereville',
        state: 'Nebraska',
        country: 'United States',
        lat: 23.4548,
        lng: 85.3448,
        name: "Nowhere's Cabin",
        description: "Come hang out at the only cabin in Nowhereville!",
        price: 159.99
      },
      {
        ownerId: 3,
        address: '125 Nowhere Lane',
        city: 'Nowhereville',
        state: 'Nebraska',
        country: 'United States',
        lat: 23.4549,
        lng: 85.3449,
        name: "Nowhere's Home",
        description: "Come hang out at the only home in Nowhereville!",
        price: 169.99
      },
      {
        ownerId: 4,
        address: '126 Nowhere Lane',
        city: 'Nowhereville',
        state: 'Nebraska',
        country: 'United States',
        lat: 23.4550,
        lng: 85.3450,
        name: "Nowhere's Estate",
        description: "Come hang out at the only estate in Nowhereville!",
        price: 179.99
      },
      {
        ownerId: 5,
        address: '127 Nowhere Lane',
        city: 'Nowhereville',
        state: 'Nebraska',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Nowhere's Mansion",
        description: "Come hang out at the only mansion in Nowhereville!",
        price: 189.99
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
    await queryInterface.bulkDelete('Spots', {
      address: ['123 Nowhere Lane', '124 Nowhere Lane', '125 Nowhere Lane', '126 Nowhere Lane', '127 Nowhere Lane']
    })
  }
};
