import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as PatreonLogo } from '../assets/patreon-logo.svg';

export default function PatreonIcon(props) {
	return (
		<SvgIcon {...props} color="error" viewBox="0 0 24 24">
			<PatreonLogo />
		</SvgIcon>
	);
}
