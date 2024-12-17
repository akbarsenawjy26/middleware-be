const express = require("express");
const router = express.Router();
const middlewareUtils = require("../../../utils/middleware_utils");
const typeController = require("../controllers/type_controller");

router.post("/", middlewareUtils.verifySession, typeController.createController);
router.get("/", middlewareUtils.verifySession, typeController.getListController);
router.get("/:guid", middlewareUtils.verifySession, typeController.getByGuidController);
router.put("/:guid", middlewareUtils.verifySession, typeController.updateController);
router.delete("/:guid", middlewareUtils.verifySession, typeController.deleteController);

module.exports = router;
