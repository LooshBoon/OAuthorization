const db = require("../models");
const config = require("../config/auth.config");
const Users = db.users;
const Op = db.Sequelize.Op;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { users } = require("../models");



//------------------------------------------------------------------------------------------------------------------------

//User record GET query


exports.findAll = (req, res) => {

  const user_id = req.params.user_id;

  Users.findAll({
    where: { user_id: user_id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user details."
      });
    });

};

//------------------------------------------------------------------------------------------------------------------------

//User record PUT query

exports.update = (req, res) => {
  const user_id = req.params.user_id;
  //const tot_points = req.params.tot_points;
  //const add_points = req.params.add_points;
  

  Users.update(req.body, 
    //{tot_points: add_points + tot_points},
    {where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update entry with id=${user_id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating entry with id=" + user_id,
      });
    });
};



//------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------

//Referral record PUT query

exports.updateStatus = (req, res) => {
  const email = req.params.email;
  

  Users.updateStatus(req.body, {
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update entry with email=${email}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating entry with email=" + email,
      });
    });
};

//------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------

//User record PUT query

exports.updatePoints = (req, res) => {
  const user_id = req.params.user_id;
  const tot_points = req.body.tot_points;

  Users.updatePoints(
    {tot_points: tot_points + 30},    
    {where: { user_id: user_id }}
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          
          message: `Entry updated successfully id=${user_id}!`,
        });
      } else {
        res.send({
          message: `Cannot update entry with id=${user_id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating entry with id=" + user_id,
      });
    });
};


//------------------------------------------------------------------------------------------------------------------------

//User record CREATE query

exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    country: req.body.country,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(data => {

          res.send(data);
        })


    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occured while creating a user!" });
    });
};

//------------------------------------------------------------------------------------------------------------------------

//User Sign in

exports.signin = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(users => {
      if (!users) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        users.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ user_id: users.user_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });



        res.status(200).send({
          user_id: users.user_id,
          fName: users.fName,
          lName: users.lName,
          country: users.country,
          gender: users.gender,
          birthdate: users.birthdate,
          email: users.email,
          tot_points: users.tot_points,
          daily_collected: users.daily_collected,
          oauths_oauth_id: users.oauths_oauth_id,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//------------------------------------------------------------------------------------------------------------------------




