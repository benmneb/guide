import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import StarRating from './StarRating';

const Result = (props) => (
	<Card className={'ProductTile'} onClick={props.clicked}>
		<CardMedia className={'MuiCardMedia-root'} component="img" image={props.image} />
		<CardContent className={'MuiCardContent-root'}>
			<Typography className={'MuiTypography--overline'} variant={'overline'} gutterBottom>
				{props.brand}
			</Typography>
			<Typography className={'MuiTypography--heading'} variant={'h6'} noWrap>
				{props.name}
			</Typography>
			{/* <Typography className={"MuiTypography--subheading"} variant={"caption"}>
        caption etc
      </Typography> */}
		</CardContent>
		<CardActions className={'MuiCardActions-root'}>
			<StarRating />
			{/* <Button color={"primary"} fullWidth>
        View Full Info <Icon>chevron_right_rounded</Icon>
      </Button> */}
		</CardActions>
	</Card>
);

Result.getTheme = (theme) => ({
	MuiCard: {
		root: {
			'&.ProductTile': {
				maxWidth: 300,
				margin: 'auto',
				transition: `${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
				boxShadow: 'none',
				borderRadius: theme.shape.borderRadius,
				'& button': {
					marginLeft: 0
				},
				'&:hover': {
					transform: 'scale(1.04)',
					boxShadow: theme.shadows[11],
					cursor: 'pointer'
				},
				'& .MuiCardMedia-root': {
					paddingTop: theme.spacing(),
					maxHeight: 300,
					position: 'relative',
					'& .MuiTypography--category': {
						color: 'rgba(255, 255, 255, 0.87)',
						position: 'absolute',
						top: theme.spacing(2.5),
						left: theme.spacing(2.5),
						letterSpacing: 0.5,
						fontWeight: 300
					}
				},
				'& .MuiCardContent-root': {
					textAlign: 'center',
					padding: theme.spacing(3),
					'& .MuiTypography--overline': {
						// brand name
						color: theme.palette.grey[500],
						fontWeight: theme.typography.fontWeightBold
					},
					'& .MuiTypography--heading': {
						/// product title
						fontWeight: theme.typography.fontWeightLight,
						lineHeight: 1.3
					},
					'& .MuiTypography--subheading': {
						// ???
						lineHeight: 1.8,
						color: 'green',
						fontWeight: theme.typography.fontWeightBold
					}
				},
				'& .MuiCardActions-root': {
					padding: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
					margin: 'auto',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column'
				}
			}
		}
	},
	MuiButton: {
		root: {
			'& svg, .material-icons': {
				marginLeft: theme.spacing()
			}
		},
		label: {
			textTransform: 'initial'
		}
	}
});

Result.metadata = {
	name: 'News Card',
	description: 'Best for Blog'
};

export default Result;
