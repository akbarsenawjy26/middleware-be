const userModels = require("../../models/user_models");
const argon = require("argon2");

const createUser = async (name, username, email, password, role) => {
  const hashPassword = await argon.hash(password);

  const data = await userModels.create({
    name: name,
    username: username,
    email: email,
    password: hashPassword,
    role: role,
  });

  return data;
};

module.exports = { createUser };
