const { projects, devices, apikeys } = require("../../../models");

class DashboardRepository {
  constructor(projects, devices, apikeys) {
    this.projects = projects;
    this.devices = devices;
    this.apikeys = apikeys;
  }

  projectCounterForAdmin = async () => {
    return this.projects.count({ where: { status: "active" } });
  };

  deviceCounterForAdmin = async () => {
    return await this.devices.count({ where: { status: "active" } });
  };

  apiKeyCounterForAdmin = async () => {
    return await this.apikeys.count({ where: { status: "active" } });
  };

  projectCounterForUser = async () => {
    return 0;
  };

  deviceCounterForUser = async (deviceUserId) => {
    return await this.devices.count({
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
    });
  };

  apiKeyCounterForUser = async (deviceUserId) => {
    return await this.apikeys.count({
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
    });
  };
}

module.exports = new DashboardRepository(projects, devices, apikeys);
