const userModels = require("../../models/user_models");
const deviceModels = require("../../models/device_models");
const apikeyeModels = require("../../models/api-key_models");

const countingData = async (userRole, deviceUserId) => {
  let userTotal, deviceTotal, apikeyTotal;

  try {
    if (userRole === "admin") {
      userTotal = await userModels.count();
      deviceTotal = await deviceModels.count();
      apikeyTotal = await apikeyeModels.count();
    } else {
      userTotal = 0;
      deviceTotal = await deviceModels.count({
        where: {
          userId: deviceUserId,
        },
      });
      apikeyTotal = await apikeyeModels.count({
        where: {
          userId: deviceUserId,
        },
      });
    }

    return {
      userTotal,
      deviceTotal,
      apikeyTotal,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { countingData };
