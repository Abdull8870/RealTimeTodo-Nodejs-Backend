const express = require("express");

const friendstodoeditController = require("../controllers/friendstodoedit");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.get("/get",checkAuth,friendstodoeditController.getEditActivity);

router.post("/title",checkAuth,friendstodoeditController.editTitle);

router.post("/desc",checkAuth,friendstodoeditController.editDescription);

router.post("/item",checkAuth,friendstodoeditController.editItem);

router.post("/subItem",checkAuth,friendstodoeditController.editSubItem);

router.post("/deleteitem",checkAuth,friendstodoeditController.deleteItem);

router.post("/deleteSubItem",checkAuth,friendstodoeditController.deleteSubItem);

router.post("/deleteActivity",checkAuth,friendstodoeditController.deleteActivity);




module.exports = router;
