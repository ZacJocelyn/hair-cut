var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var store = require('store')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/vote', function(req, res, next) {
  if (store.get('voted') === true) {
      res.render('stopit')
  }else{
  knex('vote').insert({
    name: req.body.name,
    style: req.body.style,
    color: req.body.color,
    comment: req.body.comment
    }).then( () => {
        store.set('voted', true)
        res.redirect('/voted/');
      });
  }
});


router.get('/voted', function(req, res, next) {
  return knex('vote')
  .then(votes =>{
    let shortCount = 0;
    let longCount = 0;
    let totalVotes = votes.length;
    for (var i = 0; i < votes.length; i++) {
      if (votes[i].style === 'short') {
        shortCount ++;
      }else {
        longCount ++;
      }
    }
    let short = Math.floor((shortCount / totalVotes) * 100)
    let long = Math.floor((longCount / totalVotes) * 100)
    if (short === NaN) {
      short = 0;
    }
    if (long === NaN) {
      long = 0;
    }
    res.render('voted',
    {
      votes: votes,
      short: short,
      long : long
    })
  })
});
module.exports = router;
