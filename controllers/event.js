
const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");
const Comment = require("../models/Comment");
const path=require("path");


module.exports= {
  getCreateEventPage: async(req, res) => {
    if (req.user) {
      res.render("createEvent.ejs"), {user: req.user};
    } else {
      res.render("login.ejs", {
        title: "Login",
        user: req.user
      });
    }
  },
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
}
