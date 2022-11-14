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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://cabinet-storage-production.imgix.net/8dfc96a7-d776-58d3-8092-7da16a0b56db.jpg?w=768&fit=crop&s=7dc935c9f095798ec8ea046abb7a9c9a',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cabinsathickoryridge.com/media/Woods-Cabin-Spring.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://s.yimg.com/ny/api/res/1.2/ma7rx4rhQ4n2mTXHP53XSg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTUyNztjZj13ZWJw/https://media.zenfs.com/en/smartasset_475/21759e36688ba0f43fc0796ca627e979',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Ft8x5kxv6t2ez4ht76vvg6zj5p3i215&option=N&h=472&permitphotoenlargement=false',
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

  async down(queryInterface, Sequelize) {
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
