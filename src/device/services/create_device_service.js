const deviceModel = require("../../models/device_models");

const createDevice = async (device_name, deviceUserId) => {
  try {
    const data = await deviceModel.create({
      device_name: device_name,
      userId: deviceUserId,
    });

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { createDevice };
