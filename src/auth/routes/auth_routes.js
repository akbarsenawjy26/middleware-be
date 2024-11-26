const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/", authController.sessionCheck);

module.exports = router;
