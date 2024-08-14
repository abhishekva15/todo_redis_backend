// const express = require("express");
// const router = express.Router();
// const ensureAuthenticated = require("../middlewares/Auth")

// const {createTodo} = require("../controller/createTodo");
// const {getTodo} = require("../controller/getTodo");
// // const {updateSuccess} = require("../controller/updateTodo");
// const {updateSuccess} = require("../controller/updatedTodo")
// const {deleteTodo} = require("../controller/deleteTodo");
// const {updateTodo} = require('../controller/editTodo')

// router.post("/tasks",ensureAuthenticated, createTodo);
// router.get("/tasks",ensureAuthenticated, getTodo);
// router.put("/tasks/:id",ensureAuthenticated, updateTodo);
// router.put("/updatesuccess/:id",ensureAuthenticated, updateSuccess);
// router.delete("/tasks/:id",ensureAuthenticated, deleteTodo);

// module.exports = router;

const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/Auth");
const { createTodo } = require("../controller/createTodo");
const { getTodo } = require("../controller/getTodo");
const { updateSuccess } = require("../controller/updatedTodo");
const { deleteTodo } = require("../controller/deleteTodo");
const { updateTodo } = require("../controller/editTodo");

router.post("/tasks", ensureAuthenticated, createTodo);
router.get("/tasks", ensureAuthenticated, getTodo);
router.put("/tasks/:id", ensureAuthenticated, updateTodo);
router.put("/updatesuccess/:id", ensureAuthenticated, updateSuccess);
router.delete("/tasks/:id", ensureAuthenticated, deleteTodo);

module.exports = router;
