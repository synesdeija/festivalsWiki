const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const eventsController = require("../controllers/events");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, eventsController.getEvent);

router.post("/createEvent",  upload.single("file"), eventsController.createEvent);

router.put("/likeEvent/:id", eventsController.likeEvent);

router.delete("/deleteEvent/:id", eventsController.deleteEvent);

module.exports = router;