const express= require('express');
const router = express.Router();

// router.param("userId",getUser);

router.get('/user', (req,res)=> {
    res.render('account');
})

module.exports = router;