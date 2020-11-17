const express = require("express");

const todoController = require("../controllers/todo");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/add",checkAuth,todoController.addActivity);

/**
 * @api {post} /api/todo/add
 * @apiVersion 0.0.1
 * @apiGroup create
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityName (Send activityName as a body parameter)
 * @apiParam {String} description (Send description as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 201,
    "message": "PROJECT ADDED SUCCESSFULLY"
       }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "CREATING A PROJECT FAILED",
    "status": 500,
   }
 */


router.post("/addList",checkAuth,todoController.addList);

/**
 * @api {post} /api/todo/addList
 * @apiVersion 0.0.1
 * @apiGroup create
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} list (Send list as a body parameter)
 * @apiParam {String} _id (Send _id as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
    "message": "SUCCESS"
  }


  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/addSubItem",checkAuth,todoController.addSubItem);

/**
 * @api {post} /api/todo/addSubItem
 * @apiVersion 0.0.1
 * @apiGroup create
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} subItem (Send subItem as a body parameter)
 * @apiParam {String} _id (Send _id as a body parameter)
 * @apiParam {String} itemId (Send itemId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
    "message": "SUCCESS",
  }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/listDone",checkAuth,todoController.markListDone);

/**
 * @api {post} /api/todo/listDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
    "message": "SUCCESS",
    }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/listOpen",checkAuth,todoController.markListOpen);

/**
 * @api {post} /api/todo/listOpen
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
    "message": "SUCCESS"
        }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */

router.post("/subListDone",checkAuth,todoController.markSubListDone);

/**
 * @api {post} /api/todo/subListDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} subListId (Send subListId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *    {
    "status": 200,
    "message": "SUCCESS"
   }


  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */




router.post("/subListOpen",checkAuth,todoController.markSubListOpen);

/**
 * @api {post} /api/todo/subListDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} subListId (Send subListId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *   {
    "status": 200,
    "message": "SUCCESS",
     }
  }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */




router.post("/activityDone",checkAuth,todoController.markActivityDone);

/**
 * @api {post} /api/todo/activityDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *     {
    "status": 200,
     "message":"SUCCESS"
    }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */






router.post("/restoreActivity",checkAuth,todoController.restoreActivity);

/**
 * @api {post} /api/todo/restoreActivity
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *    {
     "status": 200,
     "message":"SUCCESS"
    }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */






router.post("/openActivity",checkAuth,todoController.openActivity);


/**
 * @api {post} /api/todo/openActivity
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *    {
    "status": 200,
     "message":"SUCCESS"
    }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/undo",checkAuth,undoController.undo);

router.get("/get",checkAuth,todoController.getActivity);

/**
 * @api {get} /api/todo/get
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
     "message": "SUCCESS",
     "allActivity":[{
       activityName: "string",
       creator: "string",
       description:"string",
       modifiedBy:"string",
       active: "string",
       deleted: "string",
       mainlist:[{
           listName:"string",
           active:"Boolean",
           deleted:"Boolean",
           subItems:[{
               subItemName:"string",
               active:"Boolean",
               deleted:"Boolean"}]
             }]
                     }]
    }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Fetchinga activities failed !",
    "status": 500,
   }
 */



module.exports = router;
