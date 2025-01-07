const express = require("express");
const router = express.Router();
const deviceController = require("../controller/device_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.get("/", middlewareUtils.verifySession, deviceController.getListController);
router.get("/:guid", middlewareUtils.verifySession, deviceController.getByGuidController);
router.get("/device-check/:projectId", middlewareUtils.verifySession, deviceController.getByProjectIdController);
router.post("/", middlewareUtils.verifySession, deviceController.createController);
router.delete("/:guid", middlewareUtils.verifySession, deviceController.deleteController);
router.put("/:guid", middlewareUtils.verifySession, deviceController.updateController);

module.exports = router;
