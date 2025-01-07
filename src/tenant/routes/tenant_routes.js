const express = require("express");
const router = express.Router();
const middlewareUtils = require("../../../utils/middleware_utils");
const tenantController = require("../controllers/tenant_controller");

router.post("/", middlewareUtils.verifySession, tenantController.createController);
router.get("/", middlewareUtils.verifySession, tenantController.getListController);
router.get("/:guid", middlewareUtils.verifySession, tenantController.getByGuidController);
router.put("/:guid", middlewareUtils.verifySession, tenantController.updateController);
router.delete("/:guid", middlewareUtils.verifySession, tenantController.deleteController);

module.exports = router;
