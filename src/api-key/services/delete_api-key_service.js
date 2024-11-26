const apiKeyModel = require("../../models/api-key_models");
const { Op } = require("sequelize");

const deleteApiKey = async (guid, userRole, deviceUserId) => {
  try {
    const apikey = await apiKeyModel.findOne({ where: { guid } });
    if (!apikey) return { success: false, message: "apikey not found" };

    let data;
    if (userRole === "admin") {
      data = await apikey.destroy({ where: { guid: guid } });
    } else {
      if (deviceUserId !== apikey.userId) {
        return { success: false, message: "access denied" };
      }
      data = await apikey.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { deleteApiKey };
