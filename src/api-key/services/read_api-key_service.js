const apiKeyModel = require("../../models/api-key_models");
const userModel = require("../../models/user_models");
const { Op } = require("sequelize");

const getApiKeyList = async (userRole, deviceUserId) => {
  try {
    let data;
    if (userRole === "admin") {
      data = await apiKeyModel.findAll({
        attributes: ["guid", "api_key", "expires_at", "status", "note"],
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      data = await apiKeyModel.findAll({
        attributes: ["guid", "api_key", "expires_at", "status", "note"],
        where: {
          userId: deviceUserId,
        },
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getApiKeyByGuid = async (guid, userRole, userId) => {
  try {
    const apiKey = await apiKeyModel.findOne({ where: { guid } });
    if (!apiKey) return { success: false, message: "api key not found" };

    let data;
    if (userRole === "admin") {
      data = await apiKeyModel.findOne({
        where: { guid: guid },
        attributes: ["guid", "note"],
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      data = await apiKeyModel.findOne({
        attributes: ["guid", "note"],
        where: {
          [Op.and]: [{ guid: guid }, { userId: userId }],
        },
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
module.exports = { getApiKeyList, getApiKeyByGuid };
