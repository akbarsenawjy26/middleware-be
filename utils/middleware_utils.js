const loginService = require("../src/auth/services/login_auth_service");
const responseHelper = require("./response_utils");

const verifySession = async (req, res, next) => {
  if (!req.session.userGuid) {
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
module.exports = { verifySession, adminRole };
