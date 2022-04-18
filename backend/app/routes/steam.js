//COMMUNICATION BETWEEN BACKEND AND FRONTEND HANDLER FOR OAUTH TABLE

module.exports = app => {

    const steam = require("../controllers/steam.controller.js");

      var router = require("express").Router();
    
      router.post("/", steam.create);
    
      // Update a user with id
      router.patch("/:oauth_id", steam.update);

      // Retrieve all users
      router.get("/:oauth_id", steam.findAll);

      //router.put("/:oauth_id", steam.updateSteam)
    
      // Creates a referral record
      //router.post("/", razerData.create);
    
    
    
    
      app.use('/api/steam', router);
    
    
    
    }
    