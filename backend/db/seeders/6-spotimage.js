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
      url: "https://media.designcafe.com/wp-content/uploads/2022/07/29185240/industrial-rustic-living-room-in-earthy-tones.jpg",
      preview: false,
      spotId: 9
    },
    {
      url: "https://res.cloudinary.com/dbnngk5fd/image/upload/v1693084183/pexels-photo-1080696_zaryd5.jpg",
      preview: false,
      spotId: 7
    },
    {
      url: "https://hips.hearstapps.com/hmg-prod/images/living-room-ideas-caroline-turner-orchardlane01-copy-1670968014.jpeg",
      preview: false,
      spotId: 8
    },
    {
      url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2023/7/19/3/DOTY2023_Dramatic-Before-And-Afters_Hidden-Hills-11.jpg.rend.hgtvcom.1280.720.suffix/1689786863909.jpeg",
      preview: false,
      spotId: 9
    },
    {
      url: "https://media.architecturaldigest.com/photos/64f71af50a84399fbdce2f6a/16:9/w_2560%2Cc_limit/Living%2520with%2520Lolo%2520Photo%2520Credit_%2520Life%2520Created%25204.jpg",
      preview: false,
      spotId: 10
    },
    {
      url: "https://www.bhg.com/thmb/MaQDVndcD-FF3qtf9e50rmfVml4=/4000x0/filters:no_upscale():strip_icc()/bhg-modern-kitchen-8RbSHoA8aKT9tEG-DcYr56-039892da05774ea78f8682b3f693bb5d.jpg",
      preview: false,
      spotId: 10
    },
    {
      url: "https://res.cloudinary.com/brickandbatten/image/upload/c_scale,w_464,h_324,dpr_2/f_auto,q_auto/v1641000863/wordpress_assets/22826-ModContemporary-Accents_w-GauntletGray-a-ok.jpg?_i=AA",
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
      id: {[Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,]}
    }, {})
  }
};
