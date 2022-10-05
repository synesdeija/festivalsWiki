const Event = require("../models/Event");
const Comment = require("../models/Comment");
const commentsController = require("../controllers/comments");



module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        event: req.params.id,
        user: req.user,
      });
      console.log("Comment has been added!");
      res.redirect("/event/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findById({ _id: req.params.id });
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/event/${req.params.eventId}`);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      let event = comment.event
      console.log(comment)
      // Delete comment from db
      await Comment.findOneAndDelete({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/event/${event._id}`);
    } catch (err) {
        console.log(err);
    }
  },
};
