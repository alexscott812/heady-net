import { useLayoutEffect } from 'react';

const useCustomBodyStyles = (bodyStyles, initalBodyStyles) => {
	useLayoutEffect(() => {
		Object.keys(bodyStyles).forEach((key) => {
			document.body.style[key] = bodyStyles[key];
		});

		return () => {
			Object.keys(initalBodyStyles).forEach((key) => {
				document.body.style[key] = initalBodyStyles[key];
			});
		};
	}, [bodyStyles, initalBodyStyles]);
};

export default useCustomBodyStyles;
