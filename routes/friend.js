const express = require("express");

const friendController = require("../controllers/friend");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.get("/get",checkAuth,friendController.getAllUsers);



router.get("/all",checkAuth,friendController.getAllRequest);



/**
 * @api {get} /api/friend/all
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS",
     "data":[{ firstName:"string",
      lastName:"string",
      email:"string",
      _id:"string",
      friends:"string"
    }]
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */




router.get("/getFriends",checkAuth,friendController.getFriends);

/**
 * @api {get} /api/friend/getFriends
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS",
     "data": friends: [{
        Name:"string",
        email:"string",
        userID:"string"
      }]
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */



router.get("/getFriendRequestSent",checkAuth,friendController.getFriendRequestSent);

/**
 * @api {get} /api/friend/getFriendRequestSent
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS",
      "data" : friendRequestSent: [{
        Name:"string",
        email:"string",
        userID:"string"
      }],
      friendRequest: [{
        Name:"string",
        email:"string",
        userID:"string"
      }]
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/sendRequest",checkAuth,friendController.sendRequest);


/**
 * @api {post} /api/friend/sendRequest
 * @apiVersion 0.0.1
 * @apiGroup post
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} name (Send name as a body parameter)
 * @apiParam {String} email (Send email as a body parameter)
 * @apiParam {String} _id (Send _id tas a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS"
    }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/cancelRequest",checkAuth,friendController.cancelRequest);


router.post("/acceptRequest",checkAuth,friendController.acceptRequest);


/**
 * @api {post} /api/friend/acceptRequest
 * @apiVersion 0.0.1
 * @apiGroup post
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} userID (Send userID as a body parameter)
 * @apiParam {String} name (Send name as a body parameter)
 * @apiParam {String} email (Send email as a body parameter)
 * @apiParam {String} _id (Send _id tas a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS"
    }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */





router.post("/rejectRequest",checkAuth,friendController.rejectRequest);


/**
 * @api {post} /api/friend/rejectRequest
 * @apiVersion 0.0.1
 * @apiGroup post
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} userID (Send userID as a body parameter)
 * @apiParam {String} _id (Send _id tas a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message": "SUCCESS"
    }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "message":"Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/unFriend",checkAuth,friendController.unFriend);




module.exports = router;
