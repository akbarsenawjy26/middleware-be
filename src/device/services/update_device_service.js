const deviceModel = require("../../models/device_models");
const { Op } = require("sequelize");

const updateDeviceName = async (guid, deviceName, userRole, userId) => {
  try {
    const device = await deviceModel.findOne({ where: { guid } });
    if (!device) return { success: false, message: "device not found" };

    let data;
    if (userRole === "admin") {
      data = await deviceModel.update({ device_name: deviceName }, { where: { guid } });
    } else {
      if (userId !== device.userId) {
        return { success: false, message: "access denied" };
      }

      data = await device.update(
        {
          device_name: deviceName,
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
