import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import StarRating from './StarRating';

const Result = (props) => (
	<Card className={'MuiNewsCard--01'} onClick={props.clicked}>
		<CardMedia className={'MuiCardMedia-root'} image={props.image}>
			<Typography className={'MuiTypography--category'} />
		</CardMedia>
		<CardContent className={'MuiCardContent-root'}>
			<Typography className={'MuiTypography--overline'} variant={'overline'} gutterBottom>
				{props.brand}
			</Typography>
			<Typography className={'MuiTypography--heading'} variant={'h6'}>
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

Result.getTheme = (muiBaseTheme) => ({
	MuiCard: {
		root: {
			'&.MuiNewsCard--01': {
				maxWidth: 304,
				margin: 'auto',
				transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
				boxShadow: 'none',
				borderRadius: 0,
				'& button': {
					marginLeft: 0
				},
				'&:hover': {
					transform: 'scale(1.04)',
					boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
					cursor: 'pointer'
				},
				'& .MuiCardMedia-root': {
					paddingTop: '100%',
					maxHeight: '200px',
					position: 'relative',
					'& .MuiTypography--category': {
						color: 'rgba(255, 255, 255, 0.87)',
						position: 'absolute',
						top: muiBaseTheme.spacing(2.5),
						left: muiBaseTheme.spacing(2.5),
						letterSpacing: 0.5,
						fontWeight: 900
					}
				},
				'& .MuiCardContent-root': {
					textAlign: 'center',
					padding: muiBaseTheme.spacing(3),
					'& .MuiTypography--overline': {
						color: muiBaseTheme.palette.grey[500],
						fontWeight: 'bold'
					},
					'& .MuiTypography--heading': {
						fontWeight: 900,
						lineHeight: 1.3
					},
					'& .MuiTypography--subheading': {
						lineHeight: 1.8,
						color: muiBaseTheme.palette.text.primary,
						fontWeight: 'bold'
					}
				},
				'& .MuiCardActions-root': {
					padding: `0 ${muiBaseTheme.spacing(3)}px ${muiBaseTheme.spacing(3)}px`,
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
				marginLeft: muiBaseTheme.spacing()
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
