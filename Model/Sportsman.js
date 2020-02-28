const mongose = require("mongoose");
const Schema = mongose.Schema;

const SportsMan = new Schema({
  name: String,

  // dob: {
  //   type: String,
  //   require: true
  // },
  birth: String,
  nationality: String,
  gender: String,
  marital: String,
  location: String,

  alcohol: String,
  interests: String,
  charities: String,
  pets: String,

  association: String,
  team: String,
  sports: [String],

  about: String,
  socials: String,
  profilePic: String
});

module.exports = mongose.model("Sportsman", SportsMan);
