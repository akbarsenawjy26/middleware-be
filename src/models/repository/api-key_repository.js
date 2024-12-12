const apiKeyModel = require("../api-key_models");
const userModel = require("../user_models");
const projectModel = require("../project_models");
const { where } = require("sequelize");

class ApiKeyRepository {
  constructor(apiKeyModel) {
    this.apiKeyModel = apiKeyModel;
  }

  createApiKey = async (apiKey, deviceUserId, expiryDate, note, projectId) => {
    return await apiKeyModel.create({
      api_key: apiKey,
      userId: deviceUserId,
      expires_at: expiryDate,
      note: note,
      projectId: projectId,
    });
  };

  getApiKeyListForAdmin = async (limit, offset) => {
    return await apiKeyModel.findAll({
      limit,
      offset,
      attributes: ["guid", "api_key", "expires_at", "status", "note"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getApiKeyListForUser = async (deviceUserId, limit, offset) => {
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
        {
          model: projectModel,
          attributes: ["project_name"],
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
      attributes: ["guid", "note", "projectId"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getApiKeyByGuidForUser = async (guid, userId) => {
    return await apiKeyModel.findOne({
      attributes: ["guid", "note", "projectId"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }],
      },
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
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

  updateApiKeyForAdmin = async (guid, note, expiryDate, projetId) => {
    return await apiKeyModel.update({ note: note, expires_at: expiryDate, projetId: projetId }, { where: { guid } });
  };
  updateApiKeyForUser = async (guid, note, expiryDate, projetId, userId) => {
    return await apikey.update(
      {
        note: note,
        expires_at: expiryDate,
        projetId: projetId,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };

  checkApiKey = async (apiKey) => {
    return await apiKeyModel.findOne({
      attributes: ["status", "projectId"],
      where: { api_key: apiKey },
    });
  };

  countDataAdmin = async () => {
    return apiKeyModel.count();
  };

  countDataUser = async (deviceUserId) => {
    return apiKeyModel.count({
      where: { deviceUserId },
    });
  };
}

module.exports = new ApiKeyRepository(apiKeyModel);
