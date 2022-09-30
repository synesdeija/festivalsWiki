const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const eventsController = require("../controllers/addEvent");
const profileController= require("../controllers/profile")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, profileController.getEvent);

router.post(
  "/createEvent",
  upload.single("file"),
  eventsController.createEvent
);

router.put("/likeEvent/:id", profileController.likeEvent);

router.delete("/deleteEvent/:id", profileController.deleteEvent);

module.exports = router;
