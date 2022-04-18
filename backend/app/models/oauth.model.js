
//OAuth TABLE SETUP

module.exports = (sequelize, Sequelize) => {

    const OAuth = sequelize.define("oauths", {
    oauth_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
    razer_id: {
        allowNull: true,
        type: Sequelize.STRING,
    },
  
    razer_status: {
        type: Sequelize.BOOLEAN
      },
      steam_id: {
        allowNull: true,
        type: Sequelize.STRING,
    },
  
    steam_status: {
        type: Sequelize.BOOLEAN
      },
      battlenet_id: {
        allowNull: true,
        type: Sequelize.STRING,
    },
  
    battlenet_status: {
        type: Sequelize.BOOLEAN
      },
    

    users_user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
    },

    
    });
    return OAuth;
  };
  