const Event = require("../models/Event");
const Comment = require("../models/Comment")
const commentsController = require("../controllers/comments")
module.exports = {
    getProfile: async(req, res) => {
        try {
            const event = await Event.find({ user: req.user.id });
            res.render("profile.ejs", { events: event, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    getEvent: async(req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            console.log(event)
            const comment = await Comment.findById({ event: req.params.id }).sort({ createdAt: "desc" }).lean();
            res.render("event.ejs", { events: event, comments: comment, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    createComment: async(req, res) => {
        try {

            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                events: req.params.id,
            });
            console.log("Comment has been added!");
            res.redirect("/event/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },

    likeComment: async(req, res) => {
        try {
            const comment = await Comment.findById({ _id: req.params.id });
            await Comment.findOneAndUpdate({ _id: req.params.id }, {
                $inc: { likes: 1 },
            });
            console.log("Likes +1");
            res.redirect(`/event/${req.params.eventId}`);
        } catch (err) {
            console.log(err);
        }
    },

    deleteComment: async(req, res) => {
        try {
            // Find comment by id
            let comment = await Comment.findById({ _id: req.params.id });
            // Delete comment from db
            await Comment.findOneAndDelete({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/event/" + req.params.id);
        } catch (err) {
            res.redirect("/event/" + req.params.id);
        }
    },
};