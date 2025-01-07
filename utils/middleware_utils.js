const loginService = require("../src/auth/services/login_auth_service");
const responseHelper = require("./response_utils");
const apiKeyService = require("../src/api-key/services/check_api-key_service");

const verifySession = async (req, res, next) => {
  console.log("Req Session Guid at verivy session: ", req.session.userGuid);
  if (!req.session && req.session.userGuid) {
    return res.status(401).json(responseHelper.fail(null, "Please login first"));
  }

  const result = await loginService.authSession(req.session.userGuid);
  if (!result.success) {
    return res.status(404).json(responseHelper.fail(null, result.message));
  }
  req.deviceUserId = result.user.id;
  req.userId = result.user.guid;
  req.userRole = result.user.role;
  next();
};

const adminRole = async (req, res, next) => {
  const result = await loginService.roleVerify(req.session.userGuid);
  if (result != "admin") {
    return res.status(400).json(responseHelper.fail(null, "Permission just for bos"));
  }
  next();
};

const checkApiKey = async (req, res, next) => {
  const apiKey = req.headers["api-key"];

  if (!apiKey) {
    return res.status(400).json({ message: "Bad Request: API Key is required" });
  }

  const result = await apiKeyService.checkApiKey(apiKey);

  if (result.status !== "active") {
    return res.status(400).json(responseHelper.fail(null, "Your Api Key Invalid"));
  }

  req.projectId = result.projectId;
  next();
};

module.exports = { verifySession, adminRole, checkApiKey };
