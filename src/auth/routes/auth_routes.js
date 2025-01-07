const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const middlewareUtils = require("../../../utils/middleware_utils");

router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/", authController.sessionCheck);
router.get("/apikey-check", middlewareUtils.checkApiKey, authController.apikeyCheck);
module.exports = router;
