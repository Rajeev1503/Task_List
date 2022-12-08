const express= require('express');
const { login, signup, logout } = require('../Controller/auth-controller');
const router = express.Router();

router.get('/account', (req,res)=> {
    res.render('./Components/Account/account');
});

module.exports = router;