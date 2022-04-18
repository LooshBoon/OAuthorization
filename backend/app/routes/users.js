//COMMUNICATION BETWEEN BACKEND AND FRONTEND HANDLER FOR USER TABLE

module.exports = app => {
  const { verifySignUp } = require("../middleware");
  const users = require("../controllers/users.controller.js");


  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Sign Up
  router.post("/signup",
  
    [
      //verifySignUp.checkDuplicateUsernameOrEmail
    ],

    users.signup

  );

  //Sign In
  router.post("/signin", users.signin);

  // Retrieve all users
  router.get("/:user_id", users.findAll);


  // Update a user with email
  //router.put("/:email", users.updateStatus);


  // Update a user with id
  router.put("/:user_id", users.update);

  // Update a user's points with user_id
  router.put("/:user_id", users.updatePoints);

 



  app.use('/api/ESPL', router);
};
