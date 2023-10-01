const model = require("../models/events");
const fileUplaod = require('../middleware/fileUplaod')
const { DateTime } = require("luxon");

exports.index = (req, res, next) => {
  let events = model.find();

 let category = model.getAllDistinctCategories();

 if(events.length) {
  res.render("./events/index", { events,category });
 }else {
  let err = new Error('No events to show!')
    err.status = 404
    next(err)
 }
};


exports.new = (req, res) => {
  res.render("./events/newEvents");
};


exports.create = (req, res) => {
  let event = req.body;
  event.image = "/../images/" + req.file.filename;
  model.save(event);

  console.log('dsfsdfsdf '+ event.image)
  res.redirect("./events");

};


exports.show = (req, res, next) => {
  let id = req.params.id;
  let event = model.findByID(id);


  if (event) {
    res.render("./events/details", { event});
  } else {
   let err = new Error('Cannot find a story with id: ' + id)
    err.status = 404
    next(err)
  }

  
};



exports.edit = (req, res, next) => {
  let id = req.params.id;
  let event = model.findByID(id);


  if (event) {
    res.render("./events/edit", { event });
  } else {
    let err = new Error('Cannot find a story with id: ' + id)
    err.status = 404
    next(err)
  }

  
};


exports.update = (req, res, next) => {
  let event = req.body;
  let id = req.params.id;

  event.image = "/../images/" + req.file.filename

  if (model.updateByID(id, event)) {
    console.log("Updated Events " + event.eventStart + "dfdsf " + event.eventEnd )
    res.redirect("/events/" + id);
  } else {
    let err = new Error('Cannot find a story with id: ' + id)
    err.status = 404
    next(err)
  }
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  if (model.deleteByID(id)) {
    res.redirect("/events");
  } else {
    let err = new Error('Cannot find a story with id: ' + id)
    err.status = 404
    next(err)
  }
};
