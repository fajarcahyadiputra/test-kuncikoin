'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Fajar cahyadi',
      password: await bcrypt.hash('12345678', 10),
      email: "fajar@gmail.com"
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
