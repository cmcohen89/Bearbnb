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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 540
      },
      {
        ownerId: 1,
        address: '37216 Wilford Ridges',
        city: 'Schimmelfort',
        state: 'Oregon',
        country: 'United States',
        lat: 23.4547,
        lng: 85.3447,
        name: "Woodlands View",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 150
      },
      {
        ownerId: 2,
        address: '57473 Corkery Mountain',
        city: 'Dejuanmouth',
        state: 'Vermont',
        country: 'United States',
        lat: 23.4548,
        lng: 85.3448,
        name: "The Pears",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 200
      },
      {
        ownerId: 3,
        address: '986 Orlo Port',
        city: 'Wizaton',
        state: 'Montana',
        country: 'United States',
        lat: 23.4549,
        lng: 85.3449,
        name: "The Old Post Office",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 250
      },
      {
        ownerId: 4,
        address: '66749 Gaylord Oval Suite 164',
        city: 'West Amber',
        state: 'New Mexico',
        country: 'United States',
        lat: 23.4550,
        lng: 85.3450,
        name: "River View",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 300
      },
      {
        ownerId: 5,
        address: '860 Eden Mill',
        city: 'Port Terryville',
        state: 'South Dakota',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Woodside Grove",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 350
      },
      {
        ownerId: 1,
        address: '81415 Emil Landing Suite 719',
        city: 'Ulicesfort',
        state: 'Tennessee',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Windy House",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 100
      },
      {
        ownerId: 2,
        address: '16303 Pouros Branch Suite 889',
        city: 'Zackshire',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Doddington End",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 200
      },
      {
        ownerId: 3,
        address: '46969 Karen Trail',
        city: 'North Hector',
        state: 'Ohio',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Ginger Lodge",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 350
      },
      {
        ownerId: 4,
        address: '6855 Amy Radial',
        city: 'East Haileychester',
        state: 'Wisconsin',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Park House",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 400
      },
      {
        ownerId: 5,
        address: '34946 Schulist Court',
        city: 'Gloverhaven',
        state: 'Tennessee',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Ivylands Manor",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 420
      },
      {
        ownerId: 1,
        address: '88271 Oscar Mission',
        city: 'East Ryderchester',
        state: 'Oregon',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Picklepear Lodgings",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
        price: 355
      },
      {
        ownerId: 2,
        address: '42564 Fritsch View Apt. 716',
        city: 'East Gia',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 23.4551,
        lng: 85.3451,
        name: "Riverside Estate",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
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
