const countingDataService = require("../services/counting_data_service");
const responseHelper = require("../../../utils/response_utils");

class DashboardController {
  getCountingData = async (req, res) => {
    try {
      const data = await countingDataService.countingData(req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new DashboardController();
