var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()
  .then(results => {
    // console.log(results);

    let printUsers = "<div><h2>Våra användare</h2><div>"
    for (user in results) {
        printUsers += 
            "<ul><li>Förnamn: " + results[user].firstName + "</li>" +
            "<li>Efternamn: " + results[user].lastName + "</li>" +
            "<li>E-mail: " + results[user].email + "</li>" +
            "<li>Prenumererar: " + results[user].subscribes + "</li></ul>"
    }
    printUsers += "</div></div>"


    res.send(printUsers);
  });

  req.app.locals.db.collection("users").find({ "subscribes": true }).toArray()
  .then(results => {
    console.log(results);
    
    let printSubscriberEmail = "<div><h2>Prenumeranter</h2>"
    for (subscriber in results) {
        printSubscriberEmail += "<p>" + results[subscriber].email + "</p></div>"
    }


    // res.send(printSubscriberEmail);
  });

});

module.exports = router;
