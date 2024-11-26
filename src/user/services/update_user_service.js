const argon = require("argon2");
const AuthenticationModel = require("../../models/user_models");

const updateUser = async (guid, name, username, email, password, role) => {
  let hashPassword;

  if (password === "" || password === null) {
    hashPassword = password;
  } else {
    hashPassword = await argon.hash(password);
  }
  try {
    const data = await AuthenticationModel.update(
      {
        name: name,
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          guid: guid,
        },
      }
    );
    return data;
  } catch (error) {}
};
module.exports = {
  updateUser,
};
