const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  friends:[
    {
      Name:String,
      email:String,
      userID:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }
  ],
  friendRequest:[
    {
      Name:String,
      email:String,
      userID:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }
  ],
  friendRequestSent:[
    {
      Name:String,
      email:String,
      userID:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }
  ],
  resetToken:String,
  resetTokenExpiration:Date
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
