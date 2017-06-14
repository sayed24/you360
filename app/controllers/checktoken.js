const router = require('express').Router(),
    passport = require('passport'),
    requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function (app) {

    app.use('/api/checkreq', router);
    
};
router.use(requireAuth);

router.get('/', function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, (req, res) => {
	//console.log(req.get('Authorization'));
	//console.log(res)
	// if(res.status == 401){
	// 	res.status(422).json({
	//         success: false,
	//         message: "Unauthorized"
	//     });
	// }
	res.json("test")
})