const dashboardRepository = require("../../models/repository/dashboard_repository");

class DashboardService {
  constructor(dashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  countingData = async (userRole, deviceUserId) => {
    let userTotal, deviceTotal, apikeyTotal;

    try {
      if (userRole === "admin") {
        userTotal = await this.dashboardRepository.userCounterForAdmin();
        deviceTotal = await this.dashboardRepository.deviceCounterForAdmin();
        apikeyTotal = await this.dashboardRepository.apiKeyCounterForAdmin();
      } else {
        userTotal = await this.dashboardRepository.userCounterForUser(deviceUserId);
        deviceTotal = await this.dashboardRepository.deviceCounterForUser(deviceUserId);
        apikeyTotal = await this.dashboardRepository.apiKeyCounterForUser(deviceUserId);
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

module.exports = new DashboardService(dashboardRepository);
