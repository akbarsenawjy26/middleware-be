const AuthenticationModel = require("../../models/user_models");

const deleteUser = async (guid) => {
  try {
    const data = await AuthenticationModel.destroy({
      where: {
        guid: guid,
      },
    });
    return data;
  } catch (error) {}
};

module.exports = { deleteUser };
