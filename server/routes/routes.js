//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Answers = require('../../models/Answers');
var Counter = require('../../models/Counter');

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
        answers.sleeping = req.body.sleeping;
        answers.arriveTime = req.body.arriveTime;
        answers.activities = req.body.activities;
        answers.feeding = req.body.feeding;
        answers.personDataAgreement = req.body.personDataAgreement;
        answers.personMediaAgreement = req.body.personMediaAgreement;

        answers.save(function (err) {
            if (err)
                res.send(err);
            res.send('Answers successfully added!');
        });
    })
router.get('/getExactPerson', function (req, res) {
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var telephone = req.query.telephone.replace('%2B','+');
    console.log("Tel: ", req);
    Answers.find({ $and: [{ firstName: firstName }, { lastName: lastName }, { telephone: telephone }] },
        function (err, answers) {
            if (err)
                res.send(err);
            res.json(answers);
        });
});

router.get('/getCounterValue', function (req, res) {
    var counterId = req.query.counterId;
    Counter.find({ counterId: counterId },
        function (err, counter) {
            if (err)
                res.send(err);
            res.json(counter);
        });
});

router.get('/updateCounter', function (req, res) {
    var counterId = req.query.counterId;
    var nextCounterValue = req.query.nextCounterValue;
    Counter.update({ counterId: counterId }, { counterId: counterId, counterValue: nextCounterValue }, {upsert: true},
        function (err, counter) {
            if (err)
                res.send(err);
            res.json(counter);
        });
});
module.exports = router;