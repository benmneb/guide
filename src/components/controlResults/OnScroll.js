const OnScroll = ({ amount, selector, changer }) => {
	window.addEventListener('scroll', () => {
		if (
			document.body.scrollTop > amount ||
			document.documentElement.scrollTop > amount
		) {
			document.querySelector(selector).classList.add(changer);
		} else {
			document.querySelector(selector).classList.remove(changer);
		}
	};
	return null;
};

export default OnScroll;
