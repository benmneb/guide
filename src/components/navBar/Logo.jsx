import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoImg from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
	content: {
		padding: 20,
		marginTop: 7,
		height: 'calc(var(--header-input-height) + 10px)'
	}
}));

const Logo = () => {
	const styles = useStyles();

	return (
		<div>
			<img
				className={styles.content}
				src={LogoImg}
				alt="Vomad Guide: Find Vegan Products Near You"
			/>
		</div>
	);
};

export default Logo;
