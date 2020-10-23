import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as GoogleLogo } from '../assets/google-logo.svg';

export default function GoogleIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 96 96">
			<GoogleLogo />
		</SvgIcon>
	);
}
