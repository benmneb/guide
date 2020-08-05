import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import LogoImg from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
	container: {
		flex: '1 9999 0%'
	},
	content: {
		padding: 20,
		marginTop: 7,
		height: 'calc(var(--header-input-height) + 10px)'
	}
}));

const Logo = () => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<img
				className={styles.content}
				src={LogoImg}
				alt="Vomad Guide: Find Vegan Products Near You"
			/>
		</Box>
	);
};

export default Logo;
