//DATABASE CONNECTION SETUP



module.exports = {
  HOST: "database-pointsys-dev.chktpscsxmaw.ap-southeast-1.rds.amazonaws.com",
  USER: "postgres_espl",
  PASSWORD: "7qh8H6TROjOW44Ze0aHv",
  DB: "pointsys",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

