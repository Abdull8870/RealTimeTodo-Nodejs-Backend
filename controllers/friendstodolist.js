
const Todo=require("../models/todo");
const Undo=require("../models/undo");


exports.addActivity = (req, res, next) => {

  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const creator=req.userData.userId;
  const activityName=req.body.activityName;
  const description=req.body.description;
  const deleted=false;
  const active=true;
  let activityId;
  let createdPro;

  const todo = new Todo({
    activityName:activityName,
    creator:creator,
    active:active,
    deleted:deleted,
    description:description,
    modifiedBy:modifiedBy
  });
  todo.save()
    .then(createdProject => {
      activityId=createdProject._id;
      createdPro=createdProject;

      const undo=new Undo({
        activityId:activityId,
        history:[]
      });

      return undo.save();
    }).then(result=>{

      result.history.push(createdPro);
      return result.save();
    }).then(result=>{

      res.status(201).json({
      message: "PROJECT ADDED SUCCESSFULLY",
    });
    })
    .catch(error => {

      res.status(500).json({
        message: "CREATING A PROJECT FAILED"
      });
    });
};


exports.addList=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const listName=req.body.list;
  const _id=req.body._id;
  const active=true;
  const deleted=true;

  Todo.find({_id:_id}).then(result=>{

    result[0].mainlist.push({
      listName: listName,
      active:active,
      deleted:deleted,
      subItems:[]
    });

    return result[0].save();
  }).then(result=>{
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
      saveHistory(_id);
      res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}



exports.addSubItem=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const subItem=req.body.subItem;
  const _id=req.body._id;
  const itemId=req.body.itemId;
  const active=true;
  const deleted=false;
  Todo.find({_id:_id}).then(result=>{

    let index=result[0].mainlist.findIndex((list)=>{
     if (list._id==itemId)
      return list;
        });

      result[0].mainlist[index].subItems.push({
      subItemName:subItem,
      active:active,
      deleted:deleted
    });

    return result[0].save();
  }).then(result=>{
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    saveHistory(_id);
    res.status(201).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}



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
