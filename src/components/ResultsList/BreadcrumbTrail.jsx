import React from 'react';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import { NavigateNextRounded } from '@material-ui/icons';

function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z]/g, '-')
		.replace(/(-){2,}/g, '-');
}

export default function BreadcrumbsTrail({ breadcrumbs }) {
	if (breadcrumbs.length === 4) {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs[0])}>
					{breadcrumbs[0]}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs[1])}>
					{breadcrumbs[1]}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs[2])}>
					{breadcrumbs[2]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[3]}</Typography>
			</Breadcrumbs>
		);
	}

	if (breadcrumbs.length === 3) {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs[0])}>
					{breadcrumbs[0]}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs[1])}>
					{breadcrumbs[1]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[2]}</Typography>
			</Breadcrumbs>
		);
	}

	if (breadcrumbs.length === 2) {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs[0])}>
					{breadcrumbs[0]}
				</Link>
				<Typography color="textPrimary">{breadcrumbs[1]}</Typography>
			</Breadcrumbs>
		);
	}
}
