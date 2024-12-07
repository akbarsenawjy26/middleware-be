const userModels = require("../../models/user_models");
const deviceModels = require("../../models/device_models");
const apikeyeModels = require("../../models/api-key_models");

class DashboardRepository {
  constructor(userModels, deviceModels, apikeyeModels) {
    this.userModels = userModels;
    this.deviceModels = deviceModels;
    this.apikeyeModels = apikeyeModels;
  }

  userCounterForAdmin = async () => {
    return await userModels.count();
  };

  deviceCounterForAdmin = async () => {
    return await deviceModels.count();
  };

  apiKeyCounterForAdmin = async () => {
    return await apikeyeModels.count();
  };

  userCounterForUser = async () => {
    return 0;
  };

  deviceCounterForUser = async (deviceUserId) => {
    return await deviceModels.count({
      where: {
        userId: deviceUserId,
      },
    });
  };

  apiKeyCounterForUser = async (deviceUserId) => {
    return await apikeyeModels.count({
      where: {
        userId: deviceUserId,
      },
    });
  };
}

module.exports = new DashboardRepository(userModels, deviceModels, apikeyeModels);
