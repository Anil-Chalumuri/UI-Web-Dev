const jwt = require("jsonwebtoken");
const envVars = require("../constant/envVars");

const generateAccessToken = async (payload) => {
  const accessToken = await jwt.sign(payload, envVars.JWT_SECRET, {
    expiresIn: "1h",
  });

  return accessToken;
};

const generateRefreshToken = async (payload) => {
  const refreshToken = await jwt.sign(payload, envVars.JWT_SECRET, {
    expiresIn: "7d",
  });

  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
