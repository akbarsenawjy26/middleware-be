const deviceModel = require("../../models/device_models");
const { Op } = require("sequelize");

const deleteDevice = async (guid, userRole, deviceUserId) => {
  try {
    const device = await deviceModel.findOne({ where: { guid } });
    if (!device) return { success: false, message: "device not found" };

    let data;
    if (userRole === "admin") {
      data = await deviceModel.destroy({ where: { guid: guid } });
    } else {
      if (deviceUserId !== device.userId) {
        return { success: false, message: "access denied" };
      }
      data = await device.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
    }
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { deleteDevice };
