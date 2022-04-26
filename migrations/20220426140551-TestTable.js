'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('test_table', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primarykey: true
      },
      master: Sequelize.STRING,
      slave: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('test_table');
  }
};
