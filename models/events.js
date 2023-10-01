const { DateTime } = require("luxon");
const { v4: uuid4 } = require("uuid");

const events = [
  
    {
        id: "1",
        category: "Music Concert",
        title: "Rockin' With NORM!!!",
        host: "UNCC",
        details: "Get ready to rock the night away with live music from NORM. Join us for an unforgettable concert experience.",
        location: "UREC",
        eventStart: DateTime.fromObject({year: 2023, month:10, day: 20, hour:12, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
        eventEnd:DateTime.fromObject({year: 2023, month:10, day: 21, hour:1, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
        image: "/../images/rockin.jpg"
    },
    {
      id: "2",
      category: "Music Concert",
      title: "Rockin' With Niners!!!",
      host: "UNCC",
      details: "Get ready to rock the night away with live music from THE NINERS MUSIC GROUP LLC. Join us for an unforgettable concert experience.",
      location: "UREC",
      eventStart: DateTime.fromObject({year: 2023, month:10, day: 20, hour:12, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
      eventEnd:DateTime.fromObject({year: 2023, month:10, day: 21, hour:1, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
      image: "/../images/rockin.jpg"
  },  
    {
        id: "3",
        category: "Movie Night",
        title: "Normageddon",
        host: "Student Union Theater",
        details: "Join us for an indoor movie night under the ceiling featuring 'Normageddon.' Bring your blankets and popcorn for a cosmic cinematic adventure!",
        location: "City Park",
        eventStart: DateTime.fromObject({year: 2023, month:10, day: 20, hour:12, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
        eventEnd:DateTime.fromObject({year: 2023, month:10, day: 21, hour:1, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
        image: "/../images/movie.png"
    },
    {
      id: "4",
      category: "Movie Night",
      title: "UNCC: The Story",
      host: "UNCC",
      details: "Join us for an indoor movie night under the ceiling featuring 'UNCC: The Story.' Bring your blankets and popcorn for a cosmic cinematic adventure!",
      location: "UREC",
      eventStart: DateTime.fromObject({year: 2023, month:10, day: 20, hour:12, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
      eventEnd:DateTime.fromObject({year: 2023, month:10, day: 21, hour:1, minute: 30}).toLocaleString(DateTime.DATETIME_MED),
      image: "/../images/movie.png"
  }
]



exports.find = () => events;

exports.findByID = (id) => events.find((event) => event.id === id);

exports.save = function (event) {
  event.id = uuid4();
  
  let formattedStart  = DateTime.fromJSDate(new Date(event.eventStart)).toLocaleString(DateTime.DATETIME_MED);
  let formattedEnd = DateTime.fromJSDate(new Date(event.eventEnd)).toLocaleString(DateTime.DATETIME_MED);

  event.eventStart = formattedStart;
  event.eventEnd = formattedEnd;

  events.push(event);
};

exports.displayCategory = (category) => {
  return events.filter((event) => event.category === category);
};

exports.updateByID = function (id, newEvent) {
  let event = events.find((event) => event.id === id);

  if (event) {
    event.category = newEvent.category;
    event.title = newEvent.title;
    event.host = newEvent.host;
    event.details = newEvent.details;
    event.location = newEvent.location;

    let parsedDate = DateTime.fromJSDate(new Date(newEvent.eventStart)).toLocaleString(DateTime.DATETIME_MED);
    let parsedEnd = DateTime.fromJSDate(new Date(newEvent.eventEnd)).toLocaleString(DateTime.DATETIME_MED);
    event.eventStart = parsedDate;
    event.eventEnd = parsedEnd;

    event.image = newEvent.image;


    return true;
  } else {
    return false;
  }
};

exports.deleteByID = function (id) {
  let index = events.findIndex((event) => event.id === id);

  if (index !== -1) {
    events.splice(index, 1);
    return true;
  } else {
    return false;
  }
};


exports.getAllDistinctCategories = function() {

  const distinctCategories = new Set();
  
  events.forEach(event => {
    distinctCategories.add(event.category);
  });
  
  return Array.from(distinctCategories);
}

