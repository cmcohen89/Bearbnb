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
      {
        spotId: 6,
        url: 'https://cdn.vox-cdn.com/thumbor/_06Ha2tlHC0oyXJJtNOkJMr-hPs=/0x0:1400x897/1200x800/filters:focal(588x336:812x560)/cdn.vox-cdn.com/uploads/chorus_image/image/65893255/small_storage_xl.0.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://thumbs.dreamstime.com/b/purple-house-chiloe-chile-weird-architecture-house-number-purple-house-chiloe-chile-113636220.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'http://prod-upp-image-read.ft.com/15da1136-474c-11e3-b4d3-00144feabdc0',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/4/16/1/HUHH2019-Waterfront_Jensen-Beach-FL_34.jpg.rend.hgtvcom.966.725.suffix/1555428341787.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://media.istockphoto.com/id/951142366/photo/shoe-house.jpg?s=612x612&w=0&k=20&c=u9nkzIxHb4czQc_p6cfM4-zmvD7phWaPjq8pGkLUaJw=',
        preview: true
      },
      {
        spotId: 12,
        url: 'http://cdn.cnn.com/cnnnext/dam/assets/190730170521--tom8995.jpg',
        preview: true
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
