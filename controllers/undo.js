const Todo=require("../models/todo");
const Undo=require("../models/undo");

/**
 * @description this is used to undo the last modified item
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res 
 */


exports.undo= (req, res, next) => {
  let lastData;
  let retrievedData;
  let info;
  const activityId=req.body.id;
  Undo.findOne({activityId:activityId}).then(result=>{
    const len =result.history.length;

    if(len>1){
      retrievedData=result.history[len-2];
      lastData=retrievedData;
      result.history.pop();
      info="data remaining";
    }
    else if(len==1){
      retrievedData=result.history[0];
      lastData=retrievedData;
      info="last";
    }
    return result.save();
  }).then(result=>{
    Todo.find({_id:activityId}).then(result=>{

      result[0].activityName=lastData.activityName;
      result[0].creator=lastData.creator;
      result[0].modifiedBy=lastData.modifiedBy;
      result[0].active=lastData.active;
      result[0].deleted=lastData.deleted;
      result[0].mainlist=lastData.mainlist;

      return result[0].save({suppressWarning:true});
    }).then(result=>{
      res.status(200).json({
        message:'success',
        data:result,
        info:info
      });
    })
  }).catch(err=>{

  });

};
