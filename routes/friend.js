const express = require("express");

const friendController = require("../controllers/friend");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.get("/get",checkAuth,friendController.getAllUsers);

router.get("/all",checkAuth,friendController.getAllRequest);

router.get("/getFriends",checkAuth,friendController.getFriends);

router.get("/getFriendRequestSent",checkAuth,friendController.getFriendRequestSent);

router.post("/sendRequest",checkAuth,friendController.sendRequest);

router.post("/cancelRequest",checkAuth,friendController.cancelRequest);

router.post("/acceptRequest",checkAuth,friendController.acceptRequest);

router.post("/rejectRequest",checkAuth,friendController.rejectRequest);

router.post("/unFriend",checkAuth,friendController.unFriend);




module.exports = router;
