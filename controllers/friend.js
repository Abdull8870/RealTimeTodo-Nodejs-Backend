const User = require("../models/user");

/**
 * @description this is used to get all users details
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */



exports.getAllUsers=(req,res,next)=>{

  const id=req.query.id;
  User.find({},{firstName:1,lastName:1,email:1,_id:1,friends:1}).then(result=>{

    res.status(200).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to get friend request received by the user
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */

exports.getAllRequest=(req,res,next)=>{
  const userId=req.userData.userId;
  User.findOne({_id:userId},{friends:1,friendRequest:1,friendRequestSent:1}).then(result=>{

    res.status(200).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to get friend request sent by the user
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */



exports.getFriendRequestSent=(req,res,next)=>{
  const userId=req.userData.userId;
  User.findOne({_id:userId},{friendRequestSent:1,friendRequest:1}).then(result=>{

    res.status(200).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to get friends of the user
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.getFriends=(req,res,next)=>{
  const userId=req.userData.userId;
  User.findOne({_id:userId},{friends:1}).then(result=>{

    res.status(200).json({message:"SUCCESS",data:result});
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to send request to a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.sendRequest=(req,res,next)=>{
  const userName=req.userData.firstName+' '+req.userData.lastName;
  const userEmail=req.userData.email;
  const name=req.body.name;
  const email=req.body.email;
  const _id=req.body._id;
  const userId=req.userData.userId;
  User.findOne({_id:_id}).then(result=>{

    result.friendRequest.push({
      Name:userName,
      email:userEmail,
      userID:userId
    });
    return result.save();
  }).then(result=>{
    User.findOne({_id:userId}).then(result=>{
      result.friendRequestSent.push({
        Name:name,
        email:email,
        userID:_id
      });
      return result.save();
    }).then(result=>{
      res.status(200).json({message:"Success"});
    });
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to revoke a friend request sent to a friend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.cancelRequest=(req,res,next)=>{

  const userID=req.body.userID;
  const storedId=req.body.storedId;
  const userId=req.userData.userId;
  User.findOne({_id:userID}).then(result=>{
    let temp=result.friendRequest.filter((item) => {
      if(item.userID==userId){
        return item;
      }
    });
    let itemID=temp[0]._id;
    result.friendRequest.pull(itemID);
    return result.save();
  }).then(result=>{
    User.findOne({_id:userId}).then(result=>{
      result.friendRequestSent.pull(storedId);
      return result.save();
    }).then(result=>{
      res.status(200).json({message:"Success",data:result});
    });
    }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}



/**
 * @description this is used to accept a friend request
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.acceptRequest=(req,res,next)=>{
  const userName=req.userData.firstName+' '+req.userData.lastName;
  const userEmail=req.userData.email;
  const userId=req.userData.userId;
  const name=req.body.name;
  const email=req.body.email;
  const userID=req.body.userID;
  const itemId=req.body._id;

  User.findOne({_id:userId}).then(result=>{
    result.friends.push({
      Name:name,
      email:email,
      userID:userID
    });
    result.friendRequest.pull(itemId);
    return result.save();
  }).then(result=>{
    User.findOne({_id:userID}).then(result=>{
      result.friends.push({
        Name:userName,
        email:userEmail,
        userID:userId
      });
      let temp=result.friendRequestSent.filter((item) => {
        if(item.userID==userId){
          return item;
        }
      });

      let itemID=temp[0]._id;
      result.friendRequestSent.pull(itemID);
      return result.save();
    }).then(result=>{
      res.status(200).json({message:"Success"});
    });
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to reject a friend request
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */



exports.rejectRequest=(req,res,next)=>{

  const userId=req.userData.userId;
  const userID=req.body.userID;
  const storedId=req.body._id;
  User.findOne({_id:userId}).then(result=>{
    result.friendRequest.pull(storedId);
    return result.save();
  }).then(result=>{
    User.findOne({_id:userID}).then(result=>{

      let temp=result.friendRequestSent.filter((item) => {
        if(item.userID==userId){
          return item;
        }
      });
      ;
      let itemID=temp[0]._id;
      result.friendRequestSent.pull(itemID);
      return result.save();
    }).then(result=>{

      res.status(200).json({message:"Success"});
    });
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}

/**
 * @description this is used to unfriend
 * @author Abdul Rahuman
 * @param {*} req
 * @param {*} res
 */


exports.unFriend=(req,res,next)=>{

  const userId=req.userData.userId;
  const userID=req.body.userID;
  const storedId=req.body.storedId;
  User.findOne({_id:userId}).then(result=>{
    result.friends.pull(storedId);
    return result.save();
  }).then(result=>{
    User.findOne({_id:userID}).then(result=>{
      let temp=result.friends.filter((item) => {
        if(item.userID==userId){
          return item;
        }
      });

      let itemID=temp[0]._id;
      result.friends.pull(itemID);
      return result.save();
    }).then(result=>{
        res.status(200).json({message:"Success"});
    });
  }).catch(err=>{
      res.status(500).json({message:"Some unexpected error happened"});
  });

}
