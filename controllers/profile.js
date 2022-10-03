const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
module.exports = {
  getProfile: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user.id });
      res.render("profile.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    //find all events, sort them by time-descending. event is our model. look at schema on model to see what each event created will have (like createdAt).
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();

      res.render("feed.ejs", {user: req.user, events: events });
    } catch (err) {
      console.log(err);
    }
  },
};
