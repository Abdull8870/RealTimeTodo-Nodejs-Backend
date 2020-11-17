const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

let baseUrl = appConfig.apiVersion+'/blogs';

router.get("/countrycodes", UserController.getCode);

router.post("/signup", UserController.createUser);


/**
 * @api {post} /api/user/signup
 * @apiVersion 0.0.1
 * @apiGroup create
 *
 * @apiParam {String} email (Send email as a body parameter)
 * @apiParam {String} firstName (Send firstName as a body parameter)
 * @apiParam {String} lastName (Send lastName as a body parameter)
 * @apiParam {String} country (Send country as a body parameter)
 * @apiParam {String} phoneNumber (Send phoneNumber as a body parameter)
 * @apiParam {String} password (Send password as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *  {

    "message": "User created!",
     "status": 201,
     "result":{
      _id:"string",
      email:"string",
      password:"string",
      firstName:"string",
      lastName:"string",
      country:"string",
      phoneNumber:"string",
      friends:[],
      friendRequest:[],
      friendRequestSent:[]
         }
      }

  @apiErrorExample {json} Error-Response:
 *
 *    {
    "message": "User already exist kindly login or reset your password",
    "status": 500,
    }
 */

router.post("/login", UserController.userLogin);

/**
 * @api {post} /api/user/login
 * @apiVersion 0.0.1
 * @apiGroup user
 *
 * @apiParam {String} email (Send email as a body parameter)
 * @apiParam {String} password (Send password as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *   {
      "status": 200,
      "result":{
       token: "string",
       expiresIn: 3600,
       userId: "string",
       firstName:"string",
       lastName:"string"
    }
  }

  @apiErrorExample {json} Error-Response:
 *
 * {
    "message": "Invalid authentication credentials!",
    "status": 401,
   }
 */


router.post("/reset", UserController.userReset);

/**
 * @api {post} /api/user/reset
 * @apiVersion 0.0.1
 * @apiGroup user
 *
 * @apiParam {String} email (Send email as a body parameter)
 *  @apiSuccessExample {json} Success-Response:
 *      {
     "status": 200,
     "message": "Reset Link has been Sent Successfully",
     "id":"string",
     "firstName":"string",
     "lastName":"string"
      }

  @apiErrorExample {json} Error-Response:
 *
 *   {
    "message": ""Some Internal error occured"",
    "status": 500,
   }
 */


router.post("/resetPassword", UserController.resetPassword);

/**
 * @api {post} /api/user/resetPassword
 * @apiVersion 0.0.1
 * @apiGroup user
 *
 * @apiParam {String} token (Send email as a body parameter)
 * @apiParam {String} password (Send password as a body parameter)
 * @apiParam {String} id (Send id as a body parameter)

 *  @apiSuccessExample {json} Success-Response:
 *    {
    "status": 200,
     "message": "Your password Has been Reset Successfully"
    }

  @apiErrorExample {json} Error-Response:
 *
 *  {
    "message": "INVALID RESET CODE",
    "status": 401,
   }
 */


module.exports = router;
