const express = require("express");

const friendstodolistController = require("../controllers/friendstodolist");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/add",checkAuth,friendstodolistController.addActivity);

router.post("/addList",checkAuth,friendstodolistController.addList);

router.post("/addSubItem",checkAuth,friendstodolistController.addSubItem);

router.post("/listDone",checkAuth,friendstodolistController.markListDone);


/**
 * @api {post} /api/friendstodolist/listDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
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






router.post("/listOpen",checkAuth,friendstodolistController.markListOpen);

/**
 * @api {post} /api/friendstodolist/listOpen
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 201,
    "message": "SUCCESS"
      }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */




router.post("/subListDone",checkAuth,friendstodolistController.markSubListDone);

/**
 * @api {post} /api/friendstodolist/subListDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} subListId (Send subListId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)

 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 200,
    "message": "SUCCESS"
      }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */



router.post("/subListOpen",checkAuth,friendstodolistController.markSubListOpen);

/**
 * @api {post} /api/friendstodolist/subListDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} listId (Send listId as a body parameter)
 * @apiParam {String} subListId (Send subListId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "status": 201,
    "message": "SUCCESS"
       }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */


router.post("/activityDone",checkAuth,friendstodolistController.markActivityDone);


/**
 * @api {post} /api/friendstodolist/activityDone
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 *  @apiSuccessExample {json} Success-Response:
 *      {
    "status": 200,
    "message":"SUCCESS"
    }

  @apiErrorExample {json} Error-Response:
 *
 *     {
    "message": "Some unexpected error happened",
    "status": 500,
   }
 */





router.post("/restoreActivity",checkAuth,friendstodolistController.restoreActivity);

/**
 * @api {post} /api/friendstodolist/restoreActivity
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)

 *  @apiSuccessExample {json} Success-Response:
 *     {
    "status": 200,
    "message":"SUCCESS"
      }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */




router.post("/openActivity",checkAuth,friendstodolistController.openActivity);

/**
 * @api {post} /api/friendstodolist/openActivity
 * @apiVersion 0.0.1
 * @apiGroup update
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} activityId (Send activityId as a body parameter)
 * @apiParam {String} friendId (Send friendId as a query parameter)
 *  @apiSuccessExample {json} Success-Response:
 *    {
    "status": 200,
    "message":"SUCCESS"
    }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "Some unexpected error happened",
    "status": 500
   }
 */



router.post("/undo",checkAuth,undoController.undo);

router.get("/get",checkAuth,friendstodolistController.getActivity);

/**
 * @api {get} /api/friendstodolist/get
 * @apiVersion 0.0.1
 * @apiGroup get
 *
 * @apiParam {String} authorization (Send authorization token as a header)
 * @apiParam {String} friendId (Send friendId as a query parameter)

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
 * {
    "message": "Fetchinga activities failed !",
    "status": 500
   }
 */

module.exports = router;
