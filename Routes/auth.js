const express= require('express');
const { login, signup, logout } = require('../Controller/auth-controller');
const router = express.Router();

router.get('/auth', (req,res)=> {
    res.render('authentication/auth');
})
router.post('/login',login)
router.post('/signup',signup);
router.get('/logout', logout);

module.exports = router;