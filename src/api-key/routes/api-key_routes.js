const express = require("express");
const router = express.Router();
const apiKeyController = require("../controllers/api-key_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.post("/", middlewareUtils.verifySession, apiKeyController.createApiKey);
router.get("/", middlewareUtils.verifySession, apiKeyController.getApiKeyList);
router.get("/:guid", middlewareUtils.verifySession, apiKeyController.getApiKeyByGuid);
router.delete("/:guid", middlewareUtils.verifySession, apiKeyController.deleteApiKey);
router.put("/:guid", middlewareUtils.verifySession, apiKeyController.updateApiKey);

module.exports = router;
