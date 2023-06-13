'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        avgRating: 4.5,
      },
      {
        ownerId: 2,
        address: "1234 Disney Lane",
        city: "Colorado Springs",
        state: "Colorado",
        country: "United States of America",
        lat: 39.7645358,
        lng: -123.4730327,
        name: "App Academy 2",
        description: "Place where more web developers are created",
        price: 1234,
        avgRating: 4.5,
      },
      {
        ownerId: 3,
        address: "123 Seal Ln",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 40.7645358,
        lng: -126.4730327,
        name: "Somewhere",
        description: "Place to do things",
        price: 124,
        avgRating: 4.5,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy', 'App Academy 2', 'Somewhere']}
    })
  }
};
