const { Router } = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const checkUserexist = require("../middleware/checkuser");

const router = Router();

router.get(
  "/rejectreq/:username",
  requireAuth,
  checkUserexist,
  async (req, res) => {
    try {
      let name1 = req.params.username;
      let name2 = res.locals.user.username;
      let user1 = await User.findOne({ username: name1 });
      let user2 = await User.findOne({ username: name2 });
      let user1_id = user1._id;
      let user2_id = user2._id;
      user1.friendrequest.pull(user2_id);
      user2.friendrequest.pull(user1_id);
      Promise.all([user1.save(), user2.save()]).then(() => {
        console.log("reject request performed");
      });
      res.json("done");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);

router.get(
  "/removefriend/:username",
  requireAuth,
  checkUserexist,
  async (req, res) => {
    try {
      let name1 = req.params.username;
      let name2 = res.locals.user.username;
      let user1 = await User.findOne({ username: name1 });
      let user2 = await User.findOne({ username: name2 });
      let user1_id = user1._id;
      let user2_id = user2._id;
      user1.friends.pull(user2_id);
      user2.friends.pull(user1_id);
      Promise.all([user1.save(), user2.save()]).then(() => {
        console.log("remove friend success");
      });
      res.json("done");
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);
module.exports = router;
