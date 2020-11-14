const express = require("express");

const friendstodolistController = require("../controllers/friendstodolist");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/add",checkAuth,friendstodolistController.addActivity);

router.post("/addList",checkAuth,friendstodolistController.addList);

router.post("/addSubItem",checkAuth,friendstodolistController.addSubItem);

router.post("/listDone",checkAuth,friendstodolistController.markListDone);

router.post("/listOpen",checkAuth,friendstodolistController.markListOpen);

router.post("/subListDone",checkAuth,friendstodolistController.markSubListDone);

router.post("/subListOpen",checkAuth,friendstodolistController.markSubListOpen);

router.post("/activityDone",checkAuth,friendstodolistController.markActivityDone);

router.post("/restoreActivity",checkAuth,friendstodolistController.restoreActivity);

router.post("/openActivity",checkAuth,friendstodolistController.openActivity);

router.post("/undo",checkAuth,undoController.undo);

router.get("/get",checkAuth,friendstodolistController.getActivity);



module.exports = router;
