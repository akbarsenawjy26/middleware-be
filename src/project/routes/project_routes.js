const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.post("/", middlewareUtils.verifySession, projectController.createController);
router.get("/", middlewareUtils.verifySession, projectController.getListController);
router.get("/check", middlewareUtils.checkApiKey, projectController.getTopicController);
router.get("/list-topic", projectController.getListTopicController);
router.get("/:guid", middlewareUtils.verifySession, projectController.getByGuidController);
router.put("/:guid", middlewareUtils.verifySession, projectController.updateController);
router.delete("/:guid", middlewareUtils.verifySession, projectController.deleteController);

module.exports = router;
