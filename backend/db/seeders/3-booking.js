'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Bookings';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      startDate: "2023-06-10",
      endDate: "2023-06-15"
    },
    {
      spotId: 2,
      userId: 2,
      startDate: "2023-07-01",
      endDate: "2023-07-05"
    },
    {
      spotId: 3,
      userId: 3,
      startDate: "2023-08-20",
      endDate: "2023-08-25"
    }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};
