const deviceModel = require("../../models/device_models");
const { Op } = require("sequelize");

const updateDeviceName = async (guid, device_sn, device_name, device_type, device_location, userRole, userId) => {
  try {
    const device = await deviceModel.findOne({ where: { guid } });
    if (!device) return { success: false, message: "device not found" };

    let data;
    if (userRole === "admin") {
      data = await deviceModel.update(
        {
          device_sn: device_sn,
          device_name: device_name,
          device_type: device_type,
          device_location: device_location,
        },
        { where: { guid } }
      );
    } else {
      if (userId !== device.userId) {
        return { success: false, message: "access denied" };
      }

      data = await device.update(
        {
          device_sn: device_sn,
          device_name: device_name,
          device_type: device_type,
          device_location: device_location,
        },
        { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
      );
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { updateDeviceName };
