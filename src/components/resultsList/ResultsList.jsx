import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Result from './Result';

const muiBaseTheme = createMuiTheme();

const drawerWidth = 430;

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
		padding: theme.spacing(3),
		display: 'grid',
		gridGap: 20,
		gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	containerShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: drawerWidth
	}
}));

const ResultsList = (props) => {
	const styles = useStyles();

	return (
		<div
			className={clsx(styles.container, {
				[styles.containerShift]: props.showFiltersPanel
			})}
		>
			<MuiThemeProvider
				theme={createMuiTheme({
					typography: {
						useNextVariants: true
					},
					overrides: Result.getTheme(muiBaseTheme)
				})}
			>
				<Result
					image="https://mouthsofmums.com.au/wp-content/uploads/2016/05/046731-300x300.jpg"
					brand="Kraft"
					name="Peanut Butter - Crunchy"
				/>
				<Result
					image="https://southburnett.com.au/news2/wp-content/uploads/2017/01/kraft1.jpg"
					brand="Kraft"
					name="Peanut Butter - Smooth"
				/>
				<Result
					image="https://shop.countdown.co.nz/Content/ProductImages/zoom/9421901881054.jpg/Pics-Peanut-Butter-Crunchy.jpg"
					brand="Pic's"
					name="Really Good Peanut Butter - Crunchy Freshly Roasted and Lovingly Squashed"
				/>
				<Result
					image="https://i5.walmartimages.com/asr/c7806ff6-536e-4f37-8653-95d08d630fdb_1.5d608b379a7ef87af70460cb56c02bcf.jpeg"
					brand="Tofurky"
					name="Deli Slices - Original Recipe Savoury Plant-Based"
				/>
				<Result
					image="https://mouthsofmums.com.au/wp-content/uploads/2016/05/046731-300x300.jpg"
					brand="Kraft"
					name="Peanut Butter - Crunchy"
				/>
				<Result
					image="https://southburnett.com.au/news2/wp-content/uploads/2017/01/kraft1.jpg"
					brand="Kraft"
					name="Peanut Butter - Smooth"
				/>
				<Result
					image="https://shop.countdown.co.nz/Content/ProductImages/zoom/9421901881054.jpg/Pics-Peanut-Butter-Crunchy.jpg"
					brand="Pic's"
					name="Peanut Butter - Crunchy"
				/>
				<Result
					image="https://i5.walmartimages.com/asr/c7806ff6-536e-4f37-8653-95d08d630fdb_1.5d608b379a7ef87af70460cb56c02bcf.jpeg"
					brand="Tofurky"
					name="Deli Slices - Original Recipe Savoury Plant-Based"
				/>
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
			</MuiThemeProvider>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(ResultsList);
