const express = require("express");

const editController = require("../controllers/edit");

const undoController = require("../controllers/undo");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();



router.get("/get",checkAuth,editController.getEditActivity);

router.post("/title",checkAuth,editController.editTitle);

router.post("/desc",checkAuth,editController.editDescription);

router.post("/item",checkAuth,editController.editItem);

router.post("/subItem",checkAuth,editController.editSubItem);

router.post("/deleteitem",checkAuth,editController.deleteItem);

router.post("/deleteSubItem",checkAuth,editController.deleteSubItem);

router.post("/deleteActivity",checkAuth,editController.deleteActivity);


// router.post("/edit",checkAuth,editController.editActivity);



module.exports = router;
