const express = require("express");
const router = express.Router();
const apiKeyController = require("../controllers/api-key_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.post("/", middlewareUtils.verifySession, apiKeyController.createController);
router.get("/", middlewareUtils.verifySession, apiKeyController.getListController);
router.get("/:guid", middlewareUtils.verifySession, apiKeyController.getByGuidController);
router.delete("/:guid", middlewareUtils.verifySession, apiKeyController.deleteController);
router.put("/:guid", middlewareUtils.verifySession, apiKeyController.updateController);

module.exports = router;
