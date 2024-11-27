const deviceModel = require("../../models/device_models");

const createDevice = async (device_sn, device_name, device_type, device_location, deviceUserId) => {
  try {
    const data = await deviceModel.create({
      device_sn: device_sn,
      device_name: device_name,
      device_type: device_type,
      device_location: device_location,
      userId: deviceUserId,
    });

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { createDevice };
