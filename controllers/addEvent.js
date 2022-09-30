
const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const path=require("path");
module.exports = {

createEvent: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Event.create({
        eventName: req.body.eventName,
        fanName: req.body.fanName,
        type: req.body.type,
        venue: req.body.venue,
        location: req.body.location,
        setCount: req.body.setCount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user,
      });
      console.log("Event has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
