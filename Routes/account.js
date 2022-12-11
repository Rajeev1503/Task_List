const express= require('express');
const { isAuthenticated } = require('../Middleware/auth-middleware');
const router = express.Router();

router.get('/account',isAuthenticated, (req,res)=> {
    const user = req.user;
    res.render('./Components/Account/account', {user});
});

module.exports = router;