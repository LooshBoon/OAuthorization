const db = require("../models");
const OAuth = db.oauths;
const Op = db.Sequelize.Op;








//------------------------------------------------------------------------------------------------------------------------

//oauth record CREATE query


exports.update = (req, res) => {
  const oauth_id = req.params.oauth_id;
  //const tot_points = req.params.tot_points;
  //const add_points = req.params.add_points;
  
  console.log(req.body.steam_name)

  OAuth.update(
    {
        steam_id: req.body.steam_name,
        steam_status: true
    }, 

    {where: { oauth_id: oauth_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update entry with id=${oauth_id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating entry with id=" + oauth_id,
      });
    });
};


//oauth record CREATE query


/*exports.updateSteam = (req, res) => {
  const oauth_id = req.params.oauth_id;
  //const tot_points = req.params.tot_points;
  //const add_points = req.params.add_points;
  


  OAuth.updateSteam(req.body,

    {where: { oauth_id: oauth_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update entry with id=${oauth_id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating entry with id=" + oauth_id,
      });
    });
};*/


//oauth record CREATE query


exports.create = (req, res) => {

  console.log("I'm here now!")

  //const oauth = {
    
    //status: req.body.status ? req.body.status : false,
    //users_user_id: req.body.users_user_id
  //};

  OAuth.create(
    {
    steam_id: req.body.steamName,
    })

    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "",
      });
    });
}; 



//------------------------------------------------------------------------------------------------------------------------

//Oauth record GET query


exports.findAll = (req, res) => {

  const oauth_id = req.params.oauth_id;

  OAuth.findAll({
    where: { oauth_id: oauth_id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving oauth details."
      });
    });

};

//------------------------------------------------------------------------------------------------------------------------
