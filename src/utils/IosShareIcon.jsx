import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as IosShare } from '../assets/ios-share.svg';

export default function IosShareIcon(props) {
	return (
		<SvgIcon {...props} viewBox="0 0 24 24">
			<IosShare />
		</SvgIcon>
	);
}
