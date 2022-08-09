import jwt_decode from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const { exp } = jwt_decode(token);
    const now = new Date();
    const nowInSec = Math.floor(now.getTime()/1000);
    console.log(`${exp - nowInSec} until exp`);
    return exp > nowInSec;
  } catch (err) {
    return false;
  }
};

export default isTokenValid;
