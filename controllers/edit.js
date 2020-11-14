
const Todo=require("../models/todo");
const Undo=require("../models/undo");


exports.getEditActivity=(req,res,next)=>{

  const id=req.query.id;
  Todo.findOne({_id:id}).then(result=>{
    res.status(200).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

exports.editTitle=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const title=req.body.title;
  Todo.findOne({_id:id}).then(result=>{
    result.activityName=title;
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    saveHistory(id);
    res.status(200).json({message:"Title Edited"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

exports.editDescription=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const desc=req.body.desc;
  Todo.findOne({_id:id}).then(result=>{
    result.description=desc;
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    saveHistory(id);
    res.status(200).json({message:"Description Edited"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

exports.editItem=(req,res,next)=> {
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const itemId=req.body.itemId;
  const itemName=req.body.itemName;
  Todo.findOne({_id:id}).then(result=>{
    let index=result.mainlist.findIndex((list)=>{
     if (list._id==itemId)
      return list;
        });
       result.mainlist[index].listName=itemName;
       return result.save();
  }).then(result=>{

    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
    saveHistory(id);
    res.status(200).json({message:"Item Name Edited"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

exports.editSubItem=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const itemId=req.body.itemId;
  const subItemId=req.body.subItemId;
  const subItemName=req.body.subItemName;

  Todo.findOne({_id:id}).then(result=>{
    let index=result.mainlist.findIndex((list)=>{
     if (list._id==itemId)
      return list;
        });
     let subItemIndex=result.mainlist[index].subItems.findIndex((list)=>{
         if (list._id==subItemId)
          return list;
            });
        result.mainlist[index].subItems[subItemIndex].subItemName=subItemName;
         return result.save();
  }).then(result=>{
    result.modifiedBy=modifiedBy;
    return result.save();
  }).then(result=>{
        saveHistory(id);
      res.status(200).json({message:"Sub Item Name Edited"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}


exports.deleteItem=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const itemId=req.body.itemId;
  const deleted=true;
  Todo.findOne({_id:id}).then(result=>{
    let index=result.mainlist.findIndex((list)=>{
     if (list._id==itemId)
      return list;
        });
       // result.mainlist[index].deleted=deleted;
       result.mainlist.pull(itemId);
       result.modifiedBy=modifiedBy;
       return result.save();
  }).then(result=>{
      saveHistory(id);
      res.status(200).json({message:"ITEM DELETED"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

exports.deleteSubItem=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const itemId=req.body.itemId;
  const subItemId=req.body.subItemId;
  const deleted=true;
  Todo.findOne({_id:id}).then(result=>{
    let index=result.mainlist.findIndex((list)=>{
     if (list._id==itemId)
      return list;
        });
     let subItemIndex=result.mainlist[index].subItems.findIndex((list)=>{
         if (list._id==subItemId)
          return list;
            });
       // result.mainlist[index].subItems[subItemIndex].deleted=deleted;
       result.mainlist[index].subItems.pull(subItemId);
       result.modifiedBy=modifiedBy;
       return result.save();
  }).then(result=>{
      saveHistory(id);
      res.status(200).json({message:" SUB ITEM DELETED"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}


exports.deleteActivity=(req,res,next)=>{
  const modifiedBy=req.userData.firstName+' '+req.userData.lastName;
  const id=req.body.id;
  const deleted=true;
  Todo.findOne({_id:id}).then(result=>{
       result.deleted=deleted;
       result.modifiedBy=modifiedBy;
       return result.save();
  }).then(result=>{
      // saveHistory(id);
      res.status(200).json({message:" ACTIVITY DELETED"});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}


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
