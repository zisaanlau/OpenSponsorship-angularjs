const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Sportsman = require("../Model/Sportsman");

const db = () => {
  const mongoURL =
    "mongodb://liuz6:LzsLzs985165439@ds333098.mlab.com:33098/opensponsorship";
  // "mongodb://localhost:27017";

  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "mongodb connection error:"));

  db.once("open", function() {
    console.log("mongodb connection success！");
  });
};

router.get("/", (req, res, next) => {
  console.info("get");
  db();
  Sportsman.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.send(data);
  });
});

router.post("/", (req, res, next) => {
  db();
  var data = req.body;
  console.info(data);
  var s = new Sportsman({
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    nationality: data.nationality,
    marital: data.marital,
    location: data.location,

    alcohol: data.alcohol,
    interests: data.interests,
    charities: data.charities,
    pets: data.pets,

    association: data.association,
    team: data.team,
    sports: data.sports,

    about: data.about,
    socials: data.socials,
    profilePic: data.profilePic
  });

  s.save((err, result) => {
    if (err) {
      console.log("THERE WAS AN ERROR ", err);
      // next(err);
    }
    console.log("Data Saved");

    return res.send(true);
  });
});
router.put("/", (req, res, next) => {
  var data = req.body;
  var userId = req.body._id;
  db();
  Sportsman.findById(userId, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.info(user);
      user.name = data.name;
      user.gender = data.gender;
      user.birth = data.birth;
      user.nationality = data.nationality;
      user.marital = data.marital;
      user.location = data.location;
      user.alcohol = data.alcohol;
      user.interests = data.interests;
      user.charities = data.charities;
      user.pets = data.pets;
      user.association = data.association;
      user.team = data.team;
      user.sports = data.sports;
      user.about = data.about;
      user.socials = data.socials;
      user.profilePic = data.profilePic;
      user.save((e, r) => {
        if (e) {
          console.log(e);
        }
        console.log("data saved");
        return res.send(r);
      });
    }
  });
});

module.exports = router;
