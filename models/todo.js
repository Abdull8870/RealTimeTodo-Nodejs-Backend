const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({

  activityName: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description:{type:String},
  modifiedBy:{ type: String},
  active:{type:Boolean},
  deleted:{type:Boolean},
  mainlist:[
    {
      listName:String,
      active:Boolean,
      deleted:Boolean,
      subItems:[{
          subItemName:String,
          active:Boolean,
          deleted:Boolean,
      }]
        }]
});

module.exports = mongoose.model("ToDo", todoSchema);
