import jwt_decode from 'jwt-decode';

const getUserFromToken = (token) => {
	try {
		return jwt_decode(token).user;
	} catch (err) {
		return null;
	}
};

export default getUserFromToken;
