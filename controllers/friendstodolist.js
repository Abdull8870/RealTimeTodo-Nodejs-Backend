
const Todo=require("../models/todo");
const Undo=require("../models/undo");


/**
 * @description this is used to mark an item done in the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.markListDone=(req,res,next)=>{

  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const itemId=req.body.listId;
  const active=false;
  Todo.find({_id:_id}).then(result=>{

    result[0].modifiedBy=modifiedBy;
    const list =result[0].mainlist.filter((item) => {
      return item._id==itemId;
    });
    list[0].active=active;
    return result[0].save();
  }).then(result=>{
    saveHistory(_id);
    res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to open an item in the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */

exports.markListOpen=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const itemId=req.body.listId;
  const active=true;
  Todo.find({_id:_id}).then(result=>{

    result[0].active=active;
    result[0].modifiedBy=modifiedBy;
    const list =result[0].mainlist.filter((item) => {
      return item._id==itemId;
    });
    list[0].active=active;
    return result[0].save();
  }).then(result=>{
    saveHistory(_id);
    res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}


/**
 * @description this is used to open a sub item in the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.markSubListDone=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const itemId=req.body.listId;
  const subItemId=req.body.subListId;
  const active=false;

  Todo.find({_id:_id}).then(result=>{

    const list =result[0].mainlist.filter((item) => {
      return item._id==itemId;
    });

    const subItem=list[0].subItems.filter((item) => {
      return item._id==subItemId;
    });

    subItem[0].active=active;
    return result[0].save();
  }).then(result=>{
    saveHistory(_id);
    res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to mark a sub item done in the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.markSubListOpen=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const itemId=req.body.listId;
  const subItemId=req.body.subListId;
  const active=true;

  Todo.find({_id:_id}).then(result=>{

    const list =result[0].mainlist.filter((item) => {
      return item._id==itemId;
    });

    const subItem=list[0].subItems.filter((item) => {
      return item._id==subItemId;
    });

    subItem[0].active=active;
    return result[0].save();
  }).then(result=>{
    saveHistory(_id);
    res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}


/**
 * @description this is used to mark a todo list done of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */

exports.markActivityDone=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const active=false;
  Todo.findOne({_id:_id}).then(result=>{
    result.active=active;
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    // saveHistory(_id);
    res.status(201).json({message:"SUCCESS"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to restore a todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.restoreActivity=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const deleted=false;
  Todo.findOne({_id:_id}).then(result=>{
    result.deleted=deleted;
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    // saveHistory(_id);
    res.status(201).json({message:"SUCCESS"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to open a todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.openActivity=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const _id=req.body.activityId;
  const active=true;
  Todo.findOne({_id:_id}).then(result=>{
    result.active=active;
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    // saveHistory(_id);
    res.status(201).json({message:"SUCCESS"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to get all the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.getActivity = (req, res, next) => {

  const creator=req.query.friendId;

  Todo.find({creator:creator})
    .then(activities => {
      if (activities) {
          res.status(200).json({ message: "SUCCESS",allActivity:activities});
      } else {
        res.status(404).json({ message: "No actvities found for this user !" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetchinga activities failed !"
      });
    });

};


/**
 * @description this is used to get all the todo list of a friend
 * @author Abdul Rahuman
 * @param {*} any
 */


let saveHistory=(id)=>{

   Todo.findOne({_id:id}).then(result1=>{
     Undo.findOne({activityId:id}).then(result=>{
       result.history.push(result1);
       return result.save();
     });
   }).then(done=> {

   }).catch((err) => {

  })
};
