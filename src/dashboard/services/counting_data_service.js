const repository = require("../../models/repository/dashboard_repository");

class DashboardService {
  constructor(repository) {
    this.repository = repository;
  }

  countingData = async (userRole, deviceUserId) => {
    let projectTotal, deviceTotal, apikeyTotal;

    try {
      if (userRole === "admin") {
        projectTotal = await this.repository.projectCounterForAdmin();
        deviceTotal = await this.repository.deviceCounterForAdmin();
        apikeyTotal = await this.repository.apiKeyCounterForAdmin();
      } else {
        projectTotal = await this.repository.projectCounterForUser(deviceUserId);
        deviceTotal = await this.repository.deviceCounterForUser(deviceUserId);
        apikeyTotal = await this.repository.apiKeyCounterForUser(deviceUserId);
      }

      return {
        projectTotal,
        deviceTotal,
        apikeyTotal,
      };
    } catch (error) {
      throw new Error(`Error Fetching Data Dashboard: ${error.message}`);
    }
  };
}

module.exports = new DashboardService(repository);
