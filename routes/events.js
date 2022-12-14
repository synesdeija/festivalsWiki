const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const eventsController = require("../controllers/event");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get("/createEvent", eventsController.getCreateEventPage);

router.post(
  "/createEvent",
  upload.single("file"),
  eventsController.createEvent
);

router.put("/likeEvent/:id", eventsController.likeEvent);

router.delete("/deleteEvent/:id", eventsController.deleteEvent);

router.get("/:id", ensureAuth, eventsController.getEvent);

module.exports = router;
