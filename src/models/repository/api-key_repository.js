const { apikeys, users, projects } = require("../../../models");
const { Op, where } = require("sequelize");

class ApiKeyRepository {
  constructor(apikeys, users, projects) {
    this.apikeys = apikeys;
    this.users = users;
    this.projects = projects;
  }

  create = async (apiKey, deviceUserId, expiryDate, note, projectId) => {
    return await apikeys.create({
      api_key: apiKey,
      userId: deviceUserId,
      expires_at: expiryDate,
      note: note,
      projectId: projectId,
    });
  };

  getListForAdmin = async (limit, offset) => {
    return await apikeys.findAll({
      limit,
      offset,
      where: { status: "active" },
      attributes: ["guid", "api_key", "expires_at", "status", "note"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getListForUser = async (deviceUserId, limit, offset) => {
    return await apikeys.findAll({
      limit,
      offset,
      attributes: ["guid", "api_key", "expires_at", "status", "note"],
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getByGuid = async (guid) => {
    return await apikeys.findOne({ [Op.and]: [{ guid: guid }, { status: "active" }] });
  };

  getByGuidForAdmin = async (guid) => {
    return apikeys.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
      attributes: ["guid", "note", "projectId", "expires_at"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getByGuidForUser = async (guid, userId) => {
    return await apikeys.findOne({
      attributes: ["guid", "note", "projectId", "expires_at"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
      ],
    });
  };

  deleteForAdmin = async (guid) => {
    return await apikeys.update({ status: "inactive" }, { where: { guid: guid } });
  };

  deleteForUser = async (guid, deviceUserId) => {
    return await apikeys.destroy({ status: "inactive" }, { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateForAdmin = async (guid, note, expiryDate, projetId) => {
    return await apikeys.update({ note: note, expires_at: expiryDate, projetId: projetId }, { where: { guid } });
  };
  updateForUser = async (guid, note, expiryDate, projetId, userId) => {
    return await apikeys.update(
      {
        note: note,
        expires_at: expiryDate,
        projetId: projetId,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };

  checkApiKey = async (apiKey) => {
    return await apikeys.findOne({
      attributes: ["status", "projectId"],
      where: { api_key: apiKey },
    });
  };

  countDataAdmin = async () => {
    return apikeys.count({
      where: { status: "active" },
    });
  };

  countDataUser = async (deviceUserId) => {
    return apikeys.count({
      where: { [Op.and]: [{ userId: deviceUserId }, { status: "active" }] },
    });
  };
}

module.exports = new ApiKeyRepository(apikeys, users, projects);
