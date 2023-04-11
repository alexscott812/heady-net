import moment from 'moment';

const getRelativeTime = (d) => {
	return moment(d).fromNow();
};

export default getRelativeTime;
