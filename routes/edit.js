const express = require("express");

const editController = require("../controllers/edit");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.get("/get",checkAuth,editController.getEditActivity);

/**
 * @api {get} /api/edit/get
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a query parameter)
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
               subItemName:"string",
               active:"Boolean",
               deleted:"Boolean" }]
             }]
         }
    }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/title",checkAuth,editController.editTitle);


/**
 * @api {post} /api/edit/title
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} title (Send title as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *    {
     "status": 200,
     "message":"Title Edited"
    }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */




router.post("/desc",checkAuth,editController.editDescription);



/**
 * @api {post} /api/edit/desc
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} desc (Send desc as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *      {
     "status": 200,
     "message":"Description Edited"
      }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/item",checkAuth,editController.editItem);

/**
 * @api {post} /api/edit/item
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} itemName (Send itemName as a body parameter)

 * @apiSuccessExample {json} Success-Response:
 *     {
     "status": 200,
     "message":"Item Name Edited"
      }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/subItem",checkAuth,editController.editSubItem);


/**
 * @api {post} /api/edit/subItem
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} subItemId (Send subItemId as a body parameter)
 * @apiParam {String} subItemName (Send subItemName as a body parameter)

 * @apiSuccessExample {json} Success-Response:
 *  {
     "status": 200,
     "message":"Sub Item Name Edited"
       }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */







router.post("/deleteitem",checkAuth,editController.deleteItem);

/**
 * @api {post} /api/edit/deleteitem
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *    {
    "status": 200,
    "message":"ITEM DELETED"
    }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/deleteSubItem",checkAuth,editController.deleteSubItem);

/**
 * @api {post} /api/edit/deleteSubItem
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 * @apiParam {String} subItemId (Send subItemId as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
     "message":" SUB ITEM DELETED"
    }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */




router.post("/deleteActivity",checkAuth,editController.deleteActivity);

/**
 * @api {post} /api/edit/deleteActivity
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} id (Send id as a body parameter)
 * @apiSuccessExample {json} Success-Response:
 *     {
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


// router.post("/edit",checkAuth,editController.editActivity);



module.exports = router;
