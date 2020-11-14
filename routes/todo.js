const express = require("express");

const todoController = require("../controllers/todo");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/add",checkAuth,todoController.addActivity);

router.post("/addList",checkAuth,todoController.addList);

router.post("/addSubItem",checkAuth,todoController.addSubItem);

router.post("/listDone",checkAuth,todoController.markListDone);

router.post("/listOpen",checkAuth,todoController.markListOpen);

router.post("/subListDone",checkAuth,todoController.markSubListDone);

router.post("/subListOpen",checkAuth,todoController.markSubListOpen);

router.post("/activityDone",checkAuth,todoController.markActivityDone);

router.post("/restoreActivity",checkAuth,todoController.restoreActivity);

router.post("/openActivity",checkAuth,todoController.openActivity);

router.post("/undo",checkAuth,undoController.undo);

router.get("/get",checkAuth,todoController.getActivity);



module.exports = router;
