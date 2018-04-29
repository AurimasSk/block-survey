//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
router.get('/', function (req, res) {
    res.render('index')
});
router.route('/insert')
    .post(function (req, res) {
        var expense = new Expense();
        expense.firstName = req.body.firstName;
        expense.lastName = req.body.lastName;
        expense.workplace = req.body.workplace;
        expense.email = req.body.email;
        expense.telephone = req.body.telephone;
        expense.transport = req.body.transport;
        expense.sleeping = req.body.sleeping;
        expense.feeding = req.body.feeding;
        expense.rulesAccepted = req.body.rulesAccepted;
        expense.save(function (err) {
            if (err)
                res.send(err);
            res.send('Expense successfully added!');
        });
    })
module.exports = router;