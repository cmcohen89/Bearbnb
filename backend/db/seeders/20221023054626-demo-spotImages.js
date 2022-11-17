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
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cabinsathickoryridge.com/media/Woods-Cabin-Spring.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://s.yimg.com/ny/api/res/1.2/ma7rx4rhQ4n2mTXHP53XSg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTUyNztjZj13ZWJw/https://media.zenfs.com/en/smartasset_475/21759e36688ba0f43fc0796ca627e979',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Ft8x5kxv6t2ez4ht76vvg6zj5p3i215&option=N&h=472&permitphotoenlargement=false',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.vox-cdn.com/thumbor/_06Ha2tlHC0oyXJJtNOkJMr-hPs=/0x0:1400x897/1200x800/filters:focal(588x336:812x560)/cdn.vox-cdn.com/uploads/chorus_image/image/65893255/small_storage_xl.0.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://thumbs.dreamstime.com/b/purple-house-chiloe-chile-weird-architecture-house-number-purple-house-chiloe-chile-113636220.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://prod-upp-image-read.ft.com/15da1136-474c-11e3-b4d3-00144feabdc0',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZSUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/4/16/1/HUHH2019-Waterfront_Jensen-Beach-FL_34.jpg.rend.hgtvcom.966.725.suffix/1555428341787.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://media.istockphoto.com/id/951142366/photo/shoe-house.jpg?s=612x612&w=0&k=20&c=u9nkzIxHb4czQc_p6cfM4-zmvD7phWaPjq8pGkLUaJw=',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://cdn.cnn.com/cnnnext/dam/assets/190730170521--tom8995.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cabinet-storage-production.imgix.net/8dfc96a7-d776-58d3-8092-7da16a0b56db.jpg?w=768&fit=crop&s=7dc935c9f095798ec8ea046abb7a9c9a',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=992&q=80',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        preview: true
      },
      {
        spotId: 23,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
        preview: true
      },
      {
        spotId: 24,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://media.istockphoto.com/id/1211174464/photo/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-grass-and-blue-sky.jpg?s=612x612&w=0&k=20&c=h0XtWGD8asz_hfDVus7SWwOrtAFlZYfr7wdStKCQv14=',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: false
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
    await queryInterface.bulkDelete('SpotImages', {
      spotId: [1, 2, 3, 4, 5]
    })
  }
};
