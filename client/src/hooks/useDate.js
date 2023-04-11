import { useState } from 'react';

const useDate = () => {
	// const getTodaysDate = () => {
	//   const date = new Date();
	//   return {
	//     month: (date.getMonth()+1).toString(),
	//     day: date.getDate().toString(),
	//     year: date.getFullYear().toString()
	//   };
	// };

	const getTodaysDate = () => {
		const date = new Date();
		return {
			month: date.getMonth() + 1,
			day: date.getDate(),
			year: date.getFullYear()
		};
	};

	const [date] = useState(getTodaysDate);

	return date;
};

export default useDate;
