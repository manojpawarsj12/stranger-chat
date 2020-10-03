const { Router } = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const Conversation = require("../models/conversation");

const router = Router();

router.get("/friends", requireAuth, async (req, res) => {
  let username = res.locals.user.username;
  let fr_username = await User.findOne({ username: username });
  let friendlist = fr_username.friends;
  //console.log(friendlist);
  let ongay = [];
  for (friend of friendlist) {
    let fr_name = (await User.findById(friend)).username;
    let kek = await Conversation.find({ from: fr_username._id, to: friend })
      .sort({ created_at: -1 })
      .exec();
    //console.log(kek)
    kek = kek[kek.length - 1];
    console.log(kek);
    let kek2 = await Conversation.find({ from: friend, to: fr_username._id })
      .sort({ created_at: -1 })
      .exec();

    kek2 = kek2[kek2.length - 1];
    console.log(kek2);
    if (Date.parse(kek.created_at) > Date.parse(kek2.created_at)) {
      ongay.push([fr_name, kek.message]);
    } else {
      ongay.push([fr_name, kek2.message]);
    }
  }
  console.log(ongay);
  res.json(ongay);
});

module.exports = router;