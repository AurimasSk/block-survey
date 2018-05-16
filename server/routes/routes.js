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
        answers.feeding = req.body.feeding;
        answers.personDataAgreement = req.body.personDataAgreement;
        answers.personMediaAgreement = req.body.personMediaAgreement;
        answers.safetyAccepted = req.body.safetyAccepted;

        answers.save(function (err) {
            if (err)
                res.send(err);
            res.send('Answers successfully added!');
        });
    })
router.get('/getExactPerson', function (req, res) {
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var email = req.query.email;
    Answers.find({ $and: [{ firstName: firstName }, { lastName: lastName }, { email: email }] },
        function (err, answers) {
            if (err)
                res.send(err);
            res.json(answers);
        });
});

router.get('/getCounterValue', function (req, res) {
    console.log("Cia");
    var counterId = req.query.counterId;
    Answers.find({ counterId: counterId },
        function (err, counter) {
            console.log("Res: ", counter);
            if (err)
                res.send(err);
            res.json(counter);
        });
});

router.get('/updateCounter', function (req, res) {
    var counterId = req.query.counterId;
    var nextCounterValue = req.query.nextCounterValue;
    const doc = {
        counterId: counterId,
        counterValue: nextCounterValue
    };
    Answers.update({ counterId: counterId }, doc,
        function (err, counter) {
            if (err)
                res.send(err);
            res.json("Updated!");
        });
});
module.exports = router;