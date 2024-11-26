const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controllers");
const middlewareUtils = require("../../../utils/middleware_utils");

router.get("/", middlewareUtils.verifySession, middlewareUtils.adminRole, userController.getUserList);
router.get("/:guid", middlewareUtils.verifySession, userController.getUserByGuid);
router.post("/", userController.createUser);
router.delete("/:guid", middlewareUtils.verifySession, userController.deleteUser);
router.put("/:guid", middlewareUtils.verifySession, userController.updateUser);

module.exports = router;
