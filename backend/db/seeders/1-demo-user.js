'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Bob',
        lastName: 'Ross',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Bobby',
        lastName: 'Rossy',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Jack',
        lastName: 'Harlow',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
     {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'user3@user.io',
      username: 'CoolUser3',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      firstName: 'Eva',
      lastName: 'Smith',
      email: 'user4@user.io',
      username: 'AwesomeUser4',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      firstName: 'Chris',
      lastName: 'Brown',
      email: 'user5@user.io',
      username: 'SuperUser5',
      hashedPassword: bcrypt.hashSync('password6')
    },
    {
      firstName: 'Mia',
      lastName: 'Johnson',
      email: 'user6@user.io',
      username: 'MiaUser6',
      hashedPassword: bcrypt.hashSync('password7')
    },
    {
      firstName: 'Alex',
      lastName: 'Williams',
      email: 'user7@user.io',
      username: 'AlexUser7',
      hashedPassword: bcrypt.hashSync('password8')
    },
    {
      firstName: 'Daniel',
      lastName: 'Clark',
      email: 'user8@user.io',
      username: 'DanUser8',
      hashedPassword: bcrypt.hashSync('password9')
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
