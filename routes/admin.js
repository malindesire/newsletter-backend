var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()
  .then(results => {
    console.log(results);

    let printUsers = "<div><h2>Våra användare</h2><div>"
    for (user in results) {
        printUsers += 
            "<ul><li>Förnamn: " + results[user].firstName + "</li>" +
            "<li>Efternamn: " + results[user].lastName + "</li>" +
            "<li>E-mail: " + results[user].email + "</li>" +
            "<li>Prenumererar: " + results[user].subscribes + "</li></ul>"
    }
    printUsers += "</div></div>"

    let printSubscribers = "<div><h2>Prenumeranter</h2></div>"

    res.send(printUsers + printSubscribers);
  });


});

module.exports = router;
