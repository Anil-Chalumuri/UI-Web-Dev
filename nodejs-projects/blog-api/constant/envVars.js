const envVars = {
  MONGO_URL: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = envVars;
