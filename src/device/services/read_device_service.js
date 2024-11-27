const userModel = require("../../models/user_models");
const deviceModel = require("../../models/device_models");
const { Op } = require("sequelize");

const getDeviceList = async (userRole, deviceUserId) => {
  try {
    let data;
    if (userRole === "admin") {
      data = await deviceModel.findAll({
        attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "status"],
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      data = await deviceModel.findAll({
        attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "status"],
        where: {
          userId: deviceUserId,
        },
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getDeviceByGuid = async (guid, userRole, userId) => {
  try {
    const device = await deviceModel.findOne({ where: { guid } });
    if (!device) return { success: false, message: "device not found" };

    let data;
    if (userRole === "admin") {
      data = await deviceModel.findOne({
        where: { guid: guid },
        attributes: ["guid", "device_sn", "device_name", "device_type", "device_location"],
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      data = await deviceModel.findAll({
        attributes: ["guid", "device_sn", "device_name", "device_type", "device_location"],
        where: {
          [Op.and]: [{ guid: guid }, { userId: userId }],
        },
        include: [
          {
            model: userModel,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { getDeviceList, getDeviceByGuid };
