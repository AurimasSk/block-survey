//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Answers = require('../../models/Answers');
router.get('/', function (req, res) {
    res.render('index')
});
router.route('/insert')
    .post(function (req, res) {
        var answers = new Answers();
        answers.firstName = req.body.firstName;
        answers.lastName = req.body.lastName;
        answers.workplace = req.body.workplace;
        answers.email = req.body.email;
        answers.telephone = req.body.telephone;
        answers.transport = req.body.transport;
        answers.colleagueName = req.body.colleagueName;
        answers.sleeping = req.body.sleeping;
        answers.arriveTime = req.body.arriveTime;
        answers.customArriveTime = req.body.customArriveTime;
        answers.feeding = req.body.feeding;
        answers.rulesAccepted = req.body.rulesAccepted;
        answers.safetyAccepted = req.body.safetyAccepted;

        answers.save(function (err) {
             if (err)
                res.send(err);
             res.send('Answers successfully added!');
        });
    })
module.exports = router;