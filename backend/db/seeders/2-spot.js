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
        description: "Place where developers are created",
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
        avgRating: null,
      },
      {
        ownerId: 4,
        address: "456 Main St",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.7128,
        lng: -74.0060,
        name: "Central Park",
        description: "Iconic park in the heart of NYC",
        price: 150,
        avgRating: 4.8,
      },
      {
        ownerId: 5,
        address: "789 Ocean Blvd",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7617,
        lng: -80.1918,
        name: "Miami Beach",
        description: "Famous beach with vibrant nightlife",
        price: 200,
        avgRating: 4.7,
      },
      {
        ownerId: 6,
        address: "321 Pine St",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.6062,
        lng: -122.3321,
        name: "Space Needle",
        description: "Iconic observation tower in Seattle",
        price: 180,
        avgRating: 4.6,
      },
      {
        ownerId: 7,
        address: "555 Market St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7898,
        lng: -122.4018,
        name: "Golden Gate Bridge",
        description: "Famous suspension bridge in SF",
        price: 220,
        avgRating: 4.9,
      },
      {
        ownerId: 8,
        address: "876 Pineapple Dr",
        city: "Honolulu",
        state: "Hawaii",
        country: "United States of America",
        lat: 21.3069,
        lng: -157.8583,
        name: "Waikiki Beach",
        description: "Famous beach in Honolulu",
        price: 250,
        avgRating: 4.5,
      },
      {
        ownerId: 9,
        address: "987 Redwood Rd",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7749,
        lng: -122.4194,
        name: "Redwood National Park",
        description: "National park with giant redwood trees",
        price: 180,
        avgRating: 4.7,
      },
      {
        ownerId: 10,
        address: "654 Mountain Ave",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 39.7392,
        lng: -104.9903,
        name: "Rocky Mountains",
        description: "Breathtaking mountain range",
        price: 200,
        avgRating: 4.8,
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
