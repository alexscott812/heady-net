import jwt_decode from 'jwt-decode';

const getUserIdFromToken = (token) => {
	try {
		return jwt_decode(token).user._id;
	} catch (err) {
		return null;
	}
};

export default getUserIdFromToken;
