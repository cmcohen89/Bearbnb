'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        price: 150
      },
      {
        ownerId: 2,
        address: '124 Forest Circle',
        city: 'Woodland Forest',
        state: 'Oregon',
        country: 'United States',
        lat: 23.4548,
        lng: 85.3448,
        name: "Woodland Cabin",
        description: "Get your cabin on in lovely Woodland Forest!",
        price: 200
      },
      {
        ownerId: 3,
        address: '125 Family Court',
        city: 'Suburbia',
        state: 'Missouri',
        country: 'United States',
        lat: 23.4549,
        lng: 85.3449,
        name: "Urban Home",
        description: "The perfect place to vacation with your shitty kids!",
        price: 250
      },
      {
        ownerId: 4,
        address: '126 Hoity Road',
        city: 'Richlands',
        state: 'Texas',
        country: 'United States',
        lat: 23.4550,
        lng: 85.3450,
        name: "Richie Estate",
        description: "Let's hoity our toities here in the Richlands!",
        price: 300
      },
      {
        ownerId: 5,
        address: '127 Fancy Drive',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "The Fresh Mansion",
        description: "Fresh Prince? Nah, more like Fresh King yo",
        price: 350
      },
      {
        ownerId: 1,
        address: '128 Tiny Blvd',
        city: 'Minitown',
        state: 'Minnesota',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "The Mostest Adorable Tiny House",
        description: "Get'cho tiny on!",
        price: 100
      },
      {
        ownerId: 2,
        address: '129 Wacky Way',
        city: 'Weirdville',
        state: 'Oregon',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "The Cooky Club",
        description: "#notliketheotherhouses",
        price: 200
      },
      {
        ownerId: 3,
        address: '130 Mountain Road',
        city: 'Hilly Fields',
        state: 'Colorado',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Mountain Retreat",
        description: "Get away from it all at the mountain retreat!",
        price: 350
      },
      {
        ownerId: 4,
        address: '4278 Lakefront Shore',
        city: 'Ojai',
        state: 'California',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Lodge at the Lake",
        description: "Do you even lake bro",
        price: 400
      },
      {
        ownerId: 5,
        address: '847 Beachy Keen Court',
        city: 'Silverstrand',
        state: 'California',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "The Beach House",
        description: "Chillax at the shore my dudes",
        price: 420
      },
      {
        ownerId: 1,
        address: '42378 Crazy Court',
        city: 'Strangelands',
        state: 'Arizona',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Crazy House",
        description: "Let's do shots and get crazy",
        price: 355
      },
      {
        ownerId: 2,
        address: '8424 Insanity Lane',
        city: 'Wildplace',
        state: 'Ohio',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Insanity House",
        description: "Breh so insane",
        price: 540
      }
    ])
  },

  async down(queryInterface, Sequelize) {
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
