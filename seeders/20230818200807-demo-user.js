'use strict';
const {v4:uuid4} = require('uuid');
/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('Users', 
    [{
      user_id: uuid4(),
      surname: 'Saba',
      othernames: 'Abdullah Ayomide',
      email_address: 'abdullahayomide04@gmail.com',
      phone: '09012345443',
      user_name: 'Ayom04',
      gender: 'male',
      date_of_birth: '2022-12-21',
      about_me: 'Tech geek',
      occupation:'Software engineer',
      is_deleted: false,
      is_verified: true,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    },
    {
      user_id: uuid4(),
      surname: 'Doe',
      othernames: 'rihanah olamide',
      email_address: 'abdullahayomide09@gmail.com',
      phone: '090129845443',
      user_name: 'Doe123',
      gender: 'female',
      date_of_birth: '2022-12-21',
      about_me: 'Tech geek',
      occupation:'medical doctor',
      is_deleted: false,
      is_verified: true,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    },
    {
      user_id: uuid4(),
      surname: 'Doe',
      othernames: 'John kim',
      email_address: 'johnkimdoe@gmail.com',
      phone: '090128445443',
      user_name: 'kimInJAe',
      gender: 'male',
      date_of_birth: '1987-11-21',
      about_me: 'Tech geek',
      occupation:' musician',
      is_deleted: true,
      is_verified: false,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    },
    {
      user_id: uuid4(),
      surname: 'Kim',
      othernames: 'Son Kane',
      email_address: 'sonkane102@gmail.com',
      phone: '0901234565443',
      user_name: 'sonkane102',
      gender: 'male',
      date_of_birth: '2022-12-21',
      about_me: 'Tech geek',
      occupation:'Software engineer',
      is_deleted: false,
      is_verified: true,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    },
    {
      user_id: uuid4(),
      surname: 'lee',
      othernames: 'Wang Jun',
      email_address: 'wankjun@gmail.com',
      phone: '09012984565443',
      user_name: 'wankjun98',
      gender: 'male',
      date_of_birth: '1980-07-08',
      about_me: ' foody',
      occupation:'mobile engineer',
      is_deleted: false,
      is_verified: true,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    },
    {
      user_id: uuid4(),
      surname: 'Bola',
      othernames: 'Adebola Kane',
      email_address: 'sonkane1062@gmail.com',
      phone: '09012465443',
      user_name: 'bola078',
      gender: 'male',
      date_of_birth: '1978-05-23',
      about_me: 'Tech geek',
      occupation:'Software engineer',
      is_deleted: false,
      is_verified: true,
      password_hash: '$2b$10$qgVdgriJZL4BjJjKBZSXZemC2RHZEhx4WVWNUpnCKcmK5u9p1O87y',
      password_salt: '$2b$10$qgVdgriJZL4BjJjKBZSXZe'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
