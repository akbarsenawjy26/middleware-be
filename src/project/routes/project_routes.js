const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.post("/", middlewareUtils.verifySession, projectController.createProject);
router.get("/", middlewareUtils.verifySession, projectController.getProjectList);
router.get("/check", middlewareUtils.checkApiKey, projectController.getTopic);
router.get("/:guid", middlewareUtils.verifySession, projectController.getProjectByGuid);
router.put("/:guid", middlewareUtils.verifySession, projectController.updateProject);
router.delete("/:guid", middlewareUtils.verifySession, projectController.deleteProject);

module.exports = router;
