const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const profileController=require("../controllers/profile");
const eventController=require("../controllers/event");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/event", eventController.getEvent);
router.get("/feed", ensureAuth, profileController.getFeed);
router.get("/createEvent", eventController.getCreateEventPage);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
