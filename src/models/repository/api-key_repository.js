const apiKeyModel = require("../api-key_models");
const userModel = require("../user_models");

class ApiKeyRepository {
  constructor(apiKeyModel) {
    this.apiKeyModel = apiKeyModel;
  }

  createApiKey = async (apiKey, deviceUserId, expiryDate, statusApi, note) => {
    return await apiKeyModel.create({
      api_key: apiKey,
      userId: deviceUserId,
      expires_at: expiryDate,
      status: statusApi,
      note: note,
    });
  };

  getApiKeyListForAdmin = async () => {
    return await apiKeyModel.findAll({
      attributes: ["guid", "api_key", "expires_at", "status", "note"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getApiKeyListForUser = async (deviceUserId) => {
    return await apiKeyModel.findAll({
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
  };

  getApiKeyByGuid = async (guid) => {
    return await apiKeyModel.findOne({ where: { guid } });
  };

  getApiKeyByGuidForAdmin = async (guid) => {
    return apiKeyModel.findOne({
      where: { guid: guid },
      attributes: ["guid", "note"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getApiKeyByGuidForUser = async (guid, userId) => {
    return await apiKeyModel.findOne({
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
  };

  deleteApiKeyForAdmin = async (guid) => {
    return await apiKeyModel.destroy({ where: { guid: guid } });
  };

  deleteApiKeyForUser = async (guid, deviceUserId) => {
    return await apiKeyModel.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateApiKeyForAdmin = async (guid, note, expiryDate) => {
    return await apiKeyModel.update({ note: note, expires_at: expiryDate }, { where: { guid } });
  };
  updateApiKeyForUser = async (guid, note, expiryDate, userId) => {
    return await apikey.update(
      {
        note: note,
        expires_at: expiryDate,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };
}

module.exports = new ApiKeyRepository(apiKeyModel);
