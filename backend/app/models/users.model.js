//USER TABLE SETUP


module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING,
    },

    tot_points: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },

    birthdate: {
      type: Sequelize.STRING
    },

    fName: {
      allowNull: true,
      type: Sequelize.STRING
    },

    lName: {
      allowNull: true,
      type: Sequelize.STRING
    },
    
    daily_collected: {
      type: Sequelize.BOOLEAN
    },

    country: {
      allowNull: true,
      type: Sequelize.STRING
    },

    gender: {
      allowNull: true,
      type: Sequelize.STRING
    },

    last_log_date: {
      allowNull: true,
      type: Sequelize.DATE
    },
    oauths_oauth_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
  }

    


  });

  return Users;

};
