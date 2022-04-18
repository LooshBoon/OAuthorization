//COMMUNICATION BETWEEN BACKEND AND FRONTEND HANDLER FOR OAUTH TABLE

module.exports = app => {

    const bnet = require("../controllers/bnet.controller.js");

      var router = require("express").Router();
    
      router.post("/", bnet.create);
    
      // Update a user with id
      router.patch("/:oauth_id", bnet.update);
    
      // Creates a referral record
      //router.post("/", razerData.create);
    
    
    
    
    
     
    // Retrieve all pending referrals
      //router.get("/:users_user_id", oauth.findAll);
    
    
    // Update a user with user_id
      //router.put("/users_user_id", oauth.update);
    
    
      app.use('/api/bnet', router);
    
    
    
    }
    