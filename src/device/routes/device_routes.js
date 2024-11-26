const express = require("express");
const router = express.Router();
const deviceController = require("../controller/device_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.get("/", middlewareUtils.verifySession, deviceController.getDeviceList);
router.get("/:guid", middlewareUtils.verifySession, deviceController.getDeviceByGuid);
router.post("/", middlewareUtils.verifySession, deviceController.createDevice);
router.delete("/:guid", middlewareUtils.verifySession, deviceController.deleteDevice);
router.put("/:guid", middlewareUtils.verifySession, deviceController.updateDevice);

module.exports = router;
