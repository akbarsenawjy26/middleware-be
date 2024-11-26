const serviceCreateApiKey = require("../services/create_api-key_service");
const serviceUpdateApiKey = require("../services/update_api-key_service");
const serviceGetApiKey = require("../services/read_api-key_service");
const serviceDeleteApiKey = require("../services/delete_api-key_service");
const responseHelper = require("../../../utils/response_utils");

const getApiKeyList = async (req, res) => {
  try {
    console.log("user id FK:", req.deviceUserId);
    const data = await serviceGetApiKey.getApiKeyList(req.userRole, req.deviceUserId);
    res.status(200).json(responseHelper.success(data, "Success get All data"));
  } catch (error) {
    res.status(500).json(responseHelper.error(error.message));
  }
};
const getApiKeyByGuid = async (req, res) => {
  const { guid } = req.params;

  try {
    const data = await serviceGetApiKey.getApiKeyByGuid(guid, req.userRole, req.deviceUserId);
    res.status(200).json(responseHelper.success(data, "Success get All data"));
  } catch (error) {
    res.status(500).json(responseHelper.error(error.message));
  }
};

const createApiKey = async (req, res) => {
  const { expires_date, note } = req.body;
  try {
    console.log("Expires Date:", expires_date);
    console.log("Note:", note);
    const data = await serviceCreateApiKey.createApiKey(req.userId, req.deviceUserId, expires_date, "active", note);

    res.status(201).json(responseHelper.success(data, "Success create apikey"));
  } catch (error) {
    res.status(500).json(responseHelper.error(error.message));
  }
};

const updateApiKey = async (req, res) => {
  const { guid } = req.params;
  const { expires_date, note } = req.body;

  try {
    if (note !== null) {
      const data = await serviceUpdateApiKey.updateApiKey(guid, note, expires_date, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "success update data"));
    }
  } catch (error) {
    res.status(500).json(responseHelper.error(error.message));
  }
};

const deleteApiKey = async (req, res) => {
  const { guid } = req.params;
  try {
    const data = await serviceDeleteApiKey.deleteApiKey(guid, req.userRole, req.deviceUserId);
    if (data.message === "device not found") {
      return res.status(400).json(responseHelper.fail(null, data.message));
    }
    if (data.message === "access denied") {
      return res.status(403).json(responseHelper.fail(null, data.message));
    }

    res.status(200).json(responseHelper.success(null));
  } catch (error) {
    res.status(500).json(responseHelper.error(error.message));
  }
};

module.exports = {
  getApiKeyList,
  getApiKeyByGuid,
  createApiKey,
  updateApiKey,
  deleteApiKey,
};
