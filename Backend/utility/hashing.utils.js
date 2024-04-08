const bcrypt = require("bcrypt");
const SALT_ROUND = 12;

module.exports = {
  hashPassword: async (password) => {
    return await bcrypt.hash(password, SALT_ROUND);
  },
  comparePasswords: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};
