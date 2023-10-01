const express = require("express");
const controllers = require("../controllers/eventsControllers");
const router = express.Router();
const {fileUpload} = require("../middleware/fileUplaod")

// GET /events: send all events to user
router.get("/", controllers.index);

//GET /events/new: send html form for creating a new event
router.get("/new", controllers.new);

// POST image with event
router.post("/",  fileUpload, controllers.create);


//GET /event/:id: send details of the event identified by id
router.get("/:id", controllers.show);

//GET /event/:id/edit: send html form for editing an existing events
router.get("/:id/edit", controllers.edit);

//PUT /event/:id: update the event with the ID
router.put("/:id", fileUpload, controllers.update);

// DELETE /event/:id: delete a event with the ID
router.delete("/:id", controllers.delete);

module.exports = router;
