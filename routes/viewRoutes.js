const express = require('express');

const viewsController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  //   console.log('In here');
  res.render('details');
});

router.get('/login', viewsController.getLogin);
router.get('/logout', userController.logout);

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/manage', userController.isLoggedIn, (req, res) => {
  if (res.locals.status === 'success') {
    res.render('overview');
  } else res.redirect('/login');
});

module.exports = router;
