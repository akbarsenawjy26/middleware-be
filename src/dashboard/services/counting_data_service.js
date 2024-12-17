const repository = require("../../models/repository/dashboard_repository");

class DashboardService {
  constructor(repository) {
    this.repository = repository;
  }

  countingData = async (userRole, deviceUserId) => {
    let userTotal, deviceTotal, apikeyTotal;

    try {
      if (userRole === "admin") {
        userTotal = await this.repository.userCounterForAdmin();
        deviceTotal = await this.repository.deviceCounterForAdmin();
        apikeyTotal = await this.repository.apiKeyCounterForAdmin();
      } else {
        userTotal = await this.repository.userCounterForUser(deviceUserId);
        deviceTotal = await this.repository.deviceCounterForUser(deviceUserId);
        apikeyTotal = await this.repository.apiKeyCounterForUser(deviceUserId);
      }

      return {
        userTotal,
        deviceTotal,
        apikeyTotal,
      };
    } catch (error) {
      throw new Error(`Error Fetching Data Dashboard: ${error.message}`);
    }
  };
}

module.exports = new DashboardService(repository);
