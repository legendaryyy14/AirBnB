'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
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
   options.tableName = "SpotImages";

   return queryInterface.bulkInsert(options, [
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-106399_gg3pvm.jpg",
      preview: true,
      spotId: 1
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-1115804_mnlpkm.jpg",
      preview: true,
      spotId: 2
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-164338_ksdu9n.jpg",
      preview: true,
      spotId: 3
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-2121121_s1oh3m.jpg",
      preview: false,
      spotId: 1
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2635038_wj3xvr.webp",
      preview: false,
      spotId: 2
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2724749_r7i2ng.webp",
      preview: false,
      spotId: 3
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-1080696_zaryd5.jpg",
      preview: false,
      spotId: 1
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-276724_vyzstu.jpg",
      preview: false,
      spotId: 2
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1692757511/samples/balloons.jpg",
      preview: false,
      spotId: 3
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-106399_gg3pvm.jpg",
      preview: true,
      spotId: 4
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-1115804_mnlpkm.jpg",
      preview: true,
      spotId: 5
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-164338_ksdu9n.jpg",
      preview: true,
      spotId: 6
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-2121121_s1oh3m.jpg",
      preview: false,
      spotId: 4
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2635038_wj3xvr.webp",
      preview: false,
      spotId: 5
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2724749_r7i2ng.webp",
      preview: false,
      spotId: 6
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-1080696_zaryd5.jpg",
      preview: false,
      spotId: 4
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-276724_vyzstu.jpg",
      preview: false,
      spotId: 5
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1692757511/samples/balloons.jpg",
      preview: false,
      spotId: 6
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-106399_gg3pvm.jpg",
      preview: true,
      spotId: 1
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-1115804_mnlpkm.jpg",
      preview: true,
      spotId: 7
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693083881/pexels-photo-164338_ksdu9n.jpg",
      preview: true,
      spotId: 8
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-2121121_s1oh3m.jpg",
      preview: false,
      spotId: 9
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2635038_wj3xvr.webp",
      preview: false,
      spotId: 8
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-2724749_r7i2ng.webp",
      preview: false,
      spotId: 9
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-1080696_zaryd5.jpg",
      preview: false,
      spotId: 7
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-276724_vyzstu.jpg",
      preview: false,
      spotId: 8
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1692757511/samples/balloons.jpg",
      preview: false,
      spotId: 9
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-1080696_zaryd5.jpg",
      preview: false,
      spotId: 10
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084182/pexels-photo-276724_vyzstu.jpg",
      preview: false,
      spotId: 10
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1692757511/samples/balloons.jpg",
      preview: false,
      spotId: 10
    }

  ], {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1,2,3]}
    }, {})
  }
};
