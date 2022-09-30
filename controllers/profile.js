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
  getFeed: async (_, res) => {
    //find all events, sort them by time-descending. event is our model. look at schema on model to see what each event created will have (like createdAt).
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();

      res.render("feed.ejs", { events: events });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const comments = await Comment.find({ events: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      console.log(comments);
      res.render("event.ejs", {
        event: event,
        comments: comments,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },


  likeEvent: async (req, res) => {
    try {
      await Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/event/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      // Find event by id
      let event = await Event.findById({ _id: req.params.id });
      // Delete image from cloudinary, if an image exists
      await cloudinary.uploader.destroy(event.cloudinaryId);
      // Delete event from db
      await Event.remove({ _id: req.params.id });
      console.log("Deleted Event");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
