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
      spotId: 1,
      review: "great! So great!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 2,
      review: "great!!",
      stars: 4
    },
    {
      userId: 3,
      spotId: 1,
      review: "amazing!",
      stars: 3
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
