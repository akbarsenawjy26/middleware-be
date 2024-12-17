const userModels = require("../../models/user_models");
const deviceModels = require("../../models/device_models");
const apikeyeModels = require("../../models/api-key_models");

const { users, devices, apikeys } = require("../../../models");
const { where } = require("sequelize");

class DashboardRepository {
  constructor(users, devices, apikeys) {
    this.users = users;
    this.devices = devices;
    this.apikeys = apikeys;
  }

  userCounterForAdmin = async () => {
    return await users.count({ where: { status: "active" } });
  };

  deviceCounterForAdmin = async () => {
    return await devices.count({ where: { status: "active" } });
  };

  apiKeyCounterForAdmin = async () => {
    return await apikeys.count({ where: { status: "active" } });
  };

  userCounterForUser = async () => {
    return 0;
  };

  deviceCounterForUser = async (deviceUserId) => {
    return await deviceModels.count({
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
    });
  };

  apiKeyCounterForUser = async (deviceUserId) => {
    return await apikeyeModels.count({
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
    });
  };
}

module.exports = new DashboardRepository(users, devices, apikeys);
