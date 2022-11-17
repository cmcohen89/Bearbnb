'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Joe',
        lastName: 'Schmoe'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Jane',
        lastName: 'Schmane'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Jim',
        lastName: 'Schmin'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'John',
        lastName: 'Schmon'
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'June',
        lastName: 'Schmune'
      },
      {
        email: 'reviewmaster1@user.io',
        username: 'ReviewMaster1',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Roger',
        lastName: 'Reviewer'
      },
      {
        email: 'reviewmaster2@user.io',
        username: 'ReviewMaster2',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Rachel',
        lastName: 'Reviewer'
      },
      {
        email: 'reviewmaster3@user.io',
        username: 'ReviewMaster3',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Rose',
        lastName: 'Reviewer'
      },
      {
        email: 'reviewmaster4@user.io',
        username: 'ReviewMaster4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Ramon',
        lastName: 'Reviewer'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4'] }
    }, {});
  }
};
