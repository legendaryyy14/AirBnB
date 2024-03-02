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
   options.tableName = "Reviews";

   return queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 2,
      review: "great! So great!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 3,
      review: "great!!",
      stars: 4
    },
    {
      userId: 3,
      spotId: 1,
      review: "amazing!",
      stars: 3
    },
    {
      userId: 8,
      spotId: 4,
      review: "Awesome experience!",
      stars: 5
    },
    {
      userId: 4,
      spotId: 5,
      review: "Fantastic place!",
      stars: 4.5
    },
    {
      userId: 5,
      spotId: 6,
      review: "Lovely spot with great views!",
      stars: 4
    },
    {
      userId: 6,
      spotId: 7,
      review: "Highly recommended!",
      stars: 5
    },
    {
      userId: 7,
      spotId: 8,
      review: "Nice location, clean and cozy!",
      stars: 4.5
    },
    {
      userId: 10,
      spotId: 9,
      review: "Enjoyed my stay, will come back!",
      stars: 4
    },
    {
      userId: 9,
      spotId: 10,
      review: "Perfect spot for a getaway!",
      stars: 5
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1,2,3]}
    }, {})
  }
};
