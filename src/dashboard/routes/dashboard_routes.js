const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.get("/", middlewareUtils.verifySession, dashboardController.getCountingData);

module.exports = router;
