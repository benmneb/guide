import { Link as RouterLink } from 'react-router-dom';
import { Typography, Breadcrumbs, Link, useMediaQuery } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { toKebabCase } from '../../utils/changeCase';

const useStyles = makeStyles((theme) => ({
	orderedList: {
		[theme.breakpoints.only('xs')]: {
			margin: theme.spacing(0, 1),
			flexWrap: 'nowrap',
			display: 'inline-flex',
			whiteSpace: 'nowrap'
		}
	}
}));

export default function BreadcrumbsTrail({ breadcrumbs }) {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.only('xs'));
	const styles = useStyles();

	if (typeof breadcrumbs === 'string') {
		return (
			<Breadcrumbs
				classes={{ ol: styles.orderedList }}
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
			>
				<Typography color="inherit">Search</Typography>
				<Typography color="textPrimary">{breadcrumbs}</Typography>
			</Breadcrumbs>
		);
	}

	if (breadcrumbs.length === 4) {
		return (
			<Breadcrumbs
				classes={{ ol: styles.orderedList }}
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
				maxItems={isMobile ? 2 : 4}
			>
				<Link
					color="inherit"
					component={RouterLink}
					to={'/' + toKebabCase(breadcrumbs[0])}
				>
					{breadcrumbs[0]}
				</Link>
				<Link color="inherit" component={RouterLink} to={toKebabCase(breadcrumbs[1])}>
					{breadcrumbs[1]}
				</Link>
				<Link color="inherit" component={RouterLink} to={toKebabCase(breadcrumbs[2])}>
					{breadcrumbs[2]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[3]}</Typography>
			</Breadcrumbs>
		);
	}

	if (breadcrumbs.length === 3) {
		return (
			<Breadcrumbs
				classes={{ ol: styles.orderedList }}
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
				maxItems={isMobile ? 2 : 3}
			>
				<Link
					color="inherit"
					component={RouterLink}
					to={'/' + toKebabCase(breadcrumbs[0])}
				>
					{breadcrumbs[0]}
				</Link>
				<Link color="inherit" component={RouterLink} to={toKebabCase(breadcrumbs[1])}>
					{breadcrumbs[1]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[2]}</Typography>
			</Breadcrumbs>
		);
	}

	if (breadcrumbs.length === 2) {
		return (
			<Breadcrumbs
				classes={{ ol: styles.orderedList }}
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
			>
				<Link
					color="inherit"
					component={RouterLink}
					to={'/' + toKebabCase(breadcrumbs[0])}
				>
					{breadcrumbs[0]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[1]}</Typography>
			</Breadcrumbs>
		);
	}
}
