export function getTimeAgo(date) {
	const MINUTE = 60,
		HOUR = MINUTE * 60,
		DAY = HOUR * 24,
		WEEK = DAY * 7,
		MONTH = WEEK * 4,
		YEAR = DAY * 365;

	const secondsAgo = Math.round((+new Date() - date) / 1000);

	if (secondsAgo <= 45) {
		return 'Just now';
	} else if (secondsAgo > 45 && secondsAgo <= 90) {
		return 'One minute ago';
	} else if (secondsAgo > 90 && secondsAgo <= MINUTE * 45) {
		return Math.floor(secondsAgo / MINUTE) + ' minutes ago';
	} else if (secondsAgo > MINUTE * 45 && secondsAgo <= MINUTE * 90) {
		return 'An hour ago';
	} else if (secondsAgo > MINUTE * 90 && secondsAgo <= HOUR * 21) {
		return Math.floor(secondsAgo / HOUR) + ' hours ago';
	} else if (secondsAgo > HOUR * 21 && secondsAgo <= HOUR * 35) {
		return 'A day ago';
	} else if (secondsAgo > HOUR * 36 && secondsAgo <= DAY * 25) {
		return Math.floor(secondsAgo / DAY) + ' days ago';
	} else if (secondsAgo > DAY * 25 && secondsAgo <= DAY * 45) {
		return 'A month ago';
	} else if (secondsAgo > DAY * 45 && secondsAgo <= DAY * 320) {
		return Math.floor(secondsAgo / MONTH) + ' months ago';
	} else if (secondsAgo > DAY * 320 && secondsAgo <= YEAR * 1.5) {
		return 'A year ago';
	} else if (secondsAgo > YEAR * 1.5) {
		return Math.floor(secondsAgo / YEAR) + ' years ago';
	}
}
