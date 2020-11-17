const express = require("express");

const friendstodoeditController = require("../controllers/friendstodoedit");

const undoController = require("../controllers/undo");

const FriendsAuth = require("../middleware/friendAuth");


const router = express.Router();



router.get("/get",FriendsAuth,friendstodoeditController.getEditActivity);


/**
 * @api {get} /api/editfriendslist/get
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a query parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 * @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
    "message":"SUCCESS",
     "data":{
       activityName: "string",
       creator:  "string",
       description: "string",
       modifiedBy: "string",
       active: "string",
       deleted: "string",
       mainlist:[{
           listName:"string",
           active:"Boolean",
           deleted:"Boolean",
           subItems:[{
               subItemName: "string",
               active:"Boolean",
               deleted:"Boolean }]
             }]
     }
       }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */





router.post("/title",FriendsAuth,friendstodoeditController.editTitle);

/**
 * @api {post} /api/editfriendslist/title
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} title (Send title as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 * @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message":"Title Edited"
  }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */






router.post("/desc",FriendsAuth,friendstodoeditController.editDescription);


/**
 * @api {post} /api/editfriendslist/desc
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} desc (Send desc as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)

 * @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
     "message":"Description Edited"
  }
  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */




router.post("/item",FriendsAuth,friendstodoeditController.editItem);


/**
 * @api {post} /api/editfriendslist/item
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} itemName (Send itemName as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)

 * @apiSuccessExample {json} Success-Response:
 *      {
    "status": 200,
     "message":"Item Name Edited"
    }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */




router.post("/subItem",FriendsAuth,friendstodoeditController.editSubItem);

/**
 * @api {post} /api/editfriendslist/subItem
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} subItemId (Send subItemId as a body parameter)
 * @apiParam {String} subItemName (Send subItemName as a body parameter)

 * @apiSuccessExample {json} Success-Response:
 *      {
     "status": 200,
     "message":"Sub Item Name Edited"
    }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */






router.post("/deleteitem",FriendsAuth,friendstodoeditController.deleteItem);


/**
 * @api {post} /api/editfriendslist/deleteitem
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *   {
     "status": 200,
     "message":"ITEM DELETED"
    }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/deleteSubItem",FriendsAuth,friendstodoeditController.deleteSubItem);

/**
 * @api {post} /api/editfriendslist/deleteSubItem
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} subItemId (Send subItemId as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
     "message":" SUB ITEM DELETED"
    }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/deleteActivity",FriendsAuth,friendstodoeditController.deleteActivity);

/**
 * @api {post} /api/editfriendslist/deleteActivity
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
    "message":"ACTIVITY DELETED"
    }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */




module.exports = router;
