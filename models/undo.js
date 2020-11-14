const mongoose = require("mongoose");

const undoSchema = mongoose.Schema({
 activityId: { type: mongoose.Schema.Types.ObjectId, ref: "ToDo", required: true },
 history:[
   {
     _id: { type: mongoose.Schema.Types.ObjectId, ref: "ToDo" } ,
     activityName: { type: String, required: true },
     creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     description:{type:String},
     modifiedBy:{ type: String},
     active:{type:Boolean},
     deleted:{type:Boolean},
     mainlist:[
       {
         _id: { type: mongoose.Schema.Types.ObjectId, ref: "ToDo" } ,
         listName:String,
         active:Boolean,
         deleted:Boolean,
         subItems:[{
             _id: { type: mongoose.Schema.Types.ObjectId, ref: "ToDo" } ,
             subItemName:String,
             active:Boolean,
             deleted:Boolean,
         }]
           }]
   }
 ]

});

module.exports = mongoose.model("Undo", undoSchema);
