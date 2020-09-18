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
	if (breadcrumbs.subCategory1 === null) {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
				maxItems={4}
				itemsBeforeCollapse={0}
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs.productType)}>
					{breadcrumbs.productType}
				</Link>
				<Typography color="textPrimary">{breadcrumbs.category}</Typography>
			</Breadcrumbs>
		);
	} else if (breadcrumbs.subCategory2 === null) {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
				maxItems={4}
				itemsBeforeCollapse={0}
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs.productType)}>
					{breadcrumbs.productType}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs.category)}>
					{breadcrumbs.category}
				</Link>
				<Typography color="textPrimary">{breadcrumbs.subCategory1}</Typography>
			</Breadcrumbs>
		);
	} else {
		return (
			<Breadcrumbs
				separator={<NavigateNextRounded fontSize="small" />}
				aria-label="breadcrumb"
				maxItems={4}
				itemsBeforeCollapse={0}
			>
				<Link color="inherit" href={'/' + toKebabCase(breadcrumbs.productType)}>
					{breadcrumbs.productType}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs.category)}>
					{breadcrumbs.category}
				</Link>
				<Link color="inherit" href={toKebabCase(breadcrumbs.subCategory1)}>
					{breadcrumbs.subCategory1}
				</Link>
				<Typography color="textPrimary">{breadcrumbs.subCategory2}</Typography>
			</Breadcrumbs>
		);
	}
}
