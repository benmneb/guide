import React from 'react';
import { connect } from 'react-redux';
import { useTheme, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/Close';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Typography,
	IconButton,
	useMediaQuery,
	Box
} from '@material-ui/core';
import * as actionCreators from '../../store/actions';

const styles = (theme) => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Box component="header">
				<Typography variant="h6" component="h1">
					{children}
				</Typography>
				{onClose ? (
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={onClose}
						autoFocus
					>
						<CloseRoundedIcon />
					</IconButton>
				) : null}
			</Box>
		</MuiDialogTitle>
	);
});

const Terms = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const onClose = () => {
		props.onToggleTermsModal();
	};

	return (
		<Dialog
			open={props.showTermsModal}
			onClose={onClose}
			aria-labelledby="terms-dialog-title"
			aria-describedby="terms-dialog-description"
			fullScreen={fullScreen}
		>
			<DialogTitle id="terms-dialog-title" onClose={onClose}>
				{'Terms of Use'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="article" id="terms-dialog-description">
					<Typography variant="body1" gutterBottom>
						This website and mobile application (The Vomad Guide or VOMADguide) is
						operated by VOMAD (we, our or us). &nbsp;It is available at:
						https://vomad.guide, https://vomadguide.com and may be available through other
						addresses or channels such as mobile applications, web widgets as well as all
						linked pages (collectively, Our &lsquo;Services&rsquo;).
					</Typography>
					<Typography variant="body1" gutterBottom>
						Consent: By accessing and/or using our Services, you agree to these terms of
						use and our Privacy Policy (Terms). Please read these Terms carefully and
						immediately cease using our Services if you do not agree to them.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Use of our Services: We try to make the VOMADguide available to everyone.
						However, you cannot use our services if:
					</Typography>
					<ul>
						<li>
							You are under 13 years old (or the minimum legal age in your country to use
							our Products);
						</li>
						<li>
							We&#39;ve previously disabled your account for violations of our Terms or
							Policies; and
						</li>
						<li>
							You are prohibited from receiving our products, services, or software under
							applicable laws.
						</li>
					</ul>
					<Typography variant="body1" gutterBottom>
						Any information found to be collected from someone under age 13 will be
						deleted promptly and without notice. If you believe that we might have any
						information from or about a child under 13 years old, please contact us
						info@vomadlife.com.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Variations: We may, at any time and at our discretion, vary these Terms by
						publishing the varied terms on our website. We recommend you check our website
						regularly to ensure you are aware of our current terms. Materials and
						information on our Services (Content) are subject to change without
						notice.&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						By using the Vomad Guide you understand that:
					</Typography>
					<ol>
						<li>
							The information present on it may be, despite our best efforts, outdated or
							inaccurate and that we are in no way responsible for anything that might
							result from your use of anything listed in our services.
						</li>
						<li>
							That all external links are to completely separate entities and once you
							leave the Vomad Guide your experience no longer has anything to do with us.
						</li>
						<li>
							By making an account you agree to receive infrequent, relevant promotional
							emails from Vomad. We value privacy and will never share your details. You
							can unsubscribe at any time.
						</li>
					</ol>
					<Typography variant="body1" gutterBottom>
						Licence to use our Services: &nbsp;Unless otherwise stated, Vomad and/or its
						licensors own the intellectual property rights for all material on Vomad. All
						intellectual property rights are reserved.&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						Intellectual Property: The services and contents of the website and mobile app
						are protected by Australian and International copyright and trademark laws.
						The User Contents (as defined below) are licensed to Vomad by the user.&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						You may not copy or use, in whole or in part, any content for commercial
						purposes, reproduce, retransmit, distribute, disseminate, sell, publish,
						broadcast or circulate any Content to any third party; or breach any
						intellectual property rights connected with our Site or the Content, including
						(without limitation) altering or modifying any of the Content, causing any of
						the Content to be framed or embedded in another website or platform, or
						creating derivative works from the Content without Vomad&rsquo;s written
						consent.&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						You may download, print and copy a limited amount of content from our
						services, for your personal, non-commercial use only, provided that&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						(a) you include, without modification, all copyright and other proprietary
						notices contained in the content,
						<br />
						(b) you do not modify the content,
						<br />
						(c) you do not use the content in a manner that suggests Vomad promotes or
						endorses your, or any third party&rsquo;s causes, ideas, websites, products or
						services, and
						<br />
						(d) you do not use the content in any way that is unlawful or harmful to any
						other person or entity.
					</Typography>
					<Typography variant="body1" gutterBottom>
						You may also use apps, widgets and other tools available on our Services that
						allow selected User Contents to appear on your mobile device, personal,
						non-commercial website, blogs or other application, subject to the conditions
						subject to having no quotes from any content that may be used in any media
						without attribution to Vomad and/or vomad.guide.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Prohibited conduct: You must not do or attempt to do anything: that is
						unlawful; prohibited by any laws applicable to our Site; which we would
						consider inappropriate; or which might bring us or our Services into
						disrepute, including (without limitation):
					</Typography>
					<Typography variant="body1" gutterBottom>
						(a) anything that would constitute a breach of an individual&rsquo;s privacy
						(including uploading private or personal information without an
						individual&#39;s consent) or any other legal rights;
						<br />
						(b) using our Services to defame, harass, threaten, menace or offend any
						person;
						<br />
						(c) interfering with any user using our Services;
						<br />
						(d) tampering with or modifying our Services, knowingly transmitting viruses
						or other disabling features, or damaging or interfering with our Site,
						including (without limitation) using trojan horses, viruses or piracy or
						programming routines that may damage or interfere with our Services;
						<br />
						(e) using our Services to send unsolicited email messages; or
						<br />
						(f) &nbsp; &nbsp; facilitating or assisting a third party to do any of the
						above acts.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Cookies: We employ the use of cookies. By using the Vomad Guide you consent to
						the use of cookies in accordance with Vomad&#39;s privacy policy. Most of the
						modern-day interactive websites use cookies to enable us to retrieve user
						details for each visit. Cookies are used in some areas of our site to enable
						the functionality of this area and ease of use for those people visiting. Some
						of our affiliate/advertising partners may also use cookies.
					</Typography>
					<Typography variant="body1" gutterBottom>
						User Reviews: Certain parts of this website offer the opportunity for users to
						post reviews, make recommendations and exchange opinions, information,
						material and data (&lsquo;Reviews&rsquo;) in areas of the website. Vomad does
						not screen, edit, publish or review the Reviews prior to their appearance on
						the website and Reviews do not reflect the views or opinions of Vomad, its
						agents or affiliates. Reviews reflect the view and opinion of the person who
						posts such view or opinion.
					</Typography>
					<Typography variant="body1" gutterBottom>
						To the extent permitted by applicable laws Vomad shall not be responsible or
						liable for the Reviews or for any loss, cost, liability, damages or expenses
						caused and or suffered as a result of any use of and/or posting of and/or
						appearance of the Reviews on this website.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Vomad reserves the right to monitor all reviews and to remove any comments
						which it considers in its absolute discretion to be inappropriate, offensive
						or otherwise in breach of these Terms and Conditions.
					</Typography>
					<Typography variant="body1" gutterBottom>
						You warrant and represent that:
					</Typography>
					<Typography variant="body1" gutterBottom>
						You are entitled to post the Reviews on our website and have all necessary
						licenses and consents to do so;
					</Typography>
					<Typography variant="body1" gutterBottom>
						The Comments do not infringe any intellectual property right, including
						without limitation copyright, patent or trademark, or other proprietary rights
						of any third party;
					</Typography>
					<Typography variant="body1" gutterBottom>
						The Reviews do not contain any defamatory, libellous, offensive, indecent or
						otherwise unlawful material or material which is an invasion of privacy
					</Typography>
					<Typography variant="body1" gutterBottom>
						The Reviews will not be used to solicit or promote business or custom or
						present commercial activities or unlawful activity.
					</Typography>
					<Typography variant="body1" gutterBottom>
						You hereby grant to Vomad a non-exclusive royalty-free license to use,
						reproduce, edit and authorize others to use, reproduce and edit any of your
						Reviews in any and all forms, formats or media.
					</Typography>
					<Typography variant="body1" gutterBottom>
						User Content: You may be permitted to post, upload, publish, submit or
						transmit relevant information and content (User Content) on our Services.
						&nbsp;By making available any User Content on or through our Site, you grant
						to us a worldwide, irrevocable, perpetual, non-exclusive, transferable,
						royalty-free licence to use the User Content, with the right to use, view,
						copy, adapt, modify, distribute, license, sell, transfer, communicate,
						publicly display, publicly perform, transmit, stream, broadcast, access, or
						otherwise exploit such User Content on, through or by means of our Services.
					</Typography>
					<Typography variant="body1" gutterBottom>
						You agree that you are solely responsible for all User Content that you make
						available on or through our Services. &nbsp;You represent and warrant that:
					</Typography>
					<Typography variant="body1" gutterBottom>
						(a) you are either the sole and exclusive owner of all User Content or you
						have all rights, licences, consents and releases that are necessary to grant
						to us the rights in such User Content (as contemplated by these Terms); and
					</Typography>
					<Typography variant="body1" gutterBottom>
						(b) neither the User Content nor the posting, uploading, publication,
						submission or transmission of the User Content or our use of the User Content
						on, through or by means of our Services will infringe, misappropriate or
						violate a third party&rsquo;s intellectual property rights, or rights of
						publicity or privacy, or result in the violation of any applicable law or
						regulation.
					</Typography>
					<Typography variant="body1" gutterBottom>
						We do not endorse or approve, and are not responsible for any User Content. We
						may, at any time (at our sole discretion), remove any User Content.
					</Typography>
					<Typography variant="body1" gutterBottom>
						You further grant Vomad to use your member name, city and state, and other
						information that you have provided in connection with the User Content as
						defined in our Privacy Policy.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Iframes: Without prior approval and express written permission, you may not
						create frames around our Web pages or use other techniques that alter in any
						way the visual presentation or appearance of our website and mobile
						application.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Content Liability: We shall have no responsibility or liability for any
						content appearing on your Web site. You agree to indemnify and defend us
						against all claims arising out of or based upon your Website. No link(s) may
						appear on any page on your Website or within any context containing content or
						materials that may be interpreted as libellous, obscene or criminal, or which
						infringes, otherwise violates, or advocates the infringement or other
						violation of, any third party rights.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Disclaimer: To the maximum extent permitted by applicable law, we exclude all
						representations, warranties and conditions relating to our website and the use
						of this website (including, without limitation, any warranties implied by law
						in respect of satisfactory quality, fitness for purpose and/or the use of
						reasonable care and skill).
					</Typography>
					<Typography variant="body1" gutterBottom>
						Nothing in this disclaimer will:
					</Typography>
					<Typography variant="body1" gutterBottom>
						limit or exclude our or your liability for death or personal injury resulting
						from negligence;
					</Typography>
					<Typography variant="body1" gutterBottom>
						limit or exclude our or your liability for fraud or fraudulent
						misrepresentation;
					</Typography>
					<Typography variant="body1" gutterBottom>
						limit any of our or your liabilities in any way that is not permitted under
						applicable law; or exclude any of our or your liabilities that may not be
						excluded under applicable law.
					</Typography>
					<Typography variant="body1" gutterBottom>
						The limitations and exclusions of liability set out in this Section and
						elsewhere in this disclaimer:&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						are subject to the preceding paragraph; and
					</Typography>
					<Typography variant="body1" gutterBottom>
						govern all liabilities arising under the disclaimer or in relation to the
						subject matter of this disclaimer, including liabilities arising in contract,
						in tort (including negligence) and for breach of statutory duty.
					</Typography>
					<Typography variant="body1" gutterBottom>
						To the extent that the website/app and the information and services are
						provided as a reference only, we will not be liable for any loss or damage of
						any nature.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Limitation of liability: To the maximum extent permitted by law, we are not
						responsible for any loss, damage or expense, howsoever arising, whether direct
						or indirect and/or whether present, unascertained, future or contingent
						(Liability) suffered by you or any third party, arising from or in connection
						with your use of our Services and/or the Content and/or any inaccessibility
						of, interruption to or outage of our Services and/or any loss or corruption of
						data and/or the fact that the Content is incorrect, incomplete or
						out-of-date.&nbsp;
					</Typography>
					<Typography variant="body1" gutterBottom>
						Discontinuance: We may, at any time and without notice to you, discontinue our
						Services, in whole or in part. &nbsp;We may also exclude any person from using
						our Services, at any time and at our sole discretion. We are not responsible
						for any liability you may suffer arising from or in connection with any such
						discontinuance or exclusion.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Termination: These Terms are effective until terminated by us, which we may do
						at any time and without notice to you. &nbsp;In the event of termination, all
						restrictions imposed on you by these Terms and limitations of liability set
						out in these Terms will survive.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Severance: If a provision of these Terms is held to be void, invalid, illegal
						or unenforceable, that provision must be read down as narrowly as necessary to
						allow it to be valid or enforceable. If it is not possible to read down a
						provision (in whole or in part), that provision (or that part of that
						provision) is severed from these Terms without affecting the validity or
						enforceability of the remainder of that provision or the other provisions in
						these Terms.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Jurisdiction: Your use of our Site and these Terms are governed by the laws of
						Western Australia. You irrevocably and unconditionally submit to the exclusive
						jurisdiction of the courts operating in Western Australia and any courts
						entitled to hear appeals from those courts and waive any right to object to
						proceedings being brought in those courts.
					</Typography>
					<Typography variant="body1" gutterBottom>
						Our Site may be accessed throughout Australia and overseas. &nbsp;We make no
						representation that our Site complies with the laws (including intellectual
						property laws) of any country outside Australia. &nbsp;If you access our Site
						from outside Australia, you do so at your own risk and are responsible for
						complying with the laws of the jurisdiction where you access our Site.
					</Typography>
					<Typography variant="body1" gutterBottom>
						For any questions and notices, please contact us at:
					</Typography>
					<Typography variant="body1" gutterBottom>
						Vomad
					</Typography>
					<Typography variant="body1" gutterBottom>
						ABN: 49 625 878 826
					</Typography>
					<Typography variant="body1" gutterBottom>
						Email: info@vomadlife.com
					</Typography>
					<Typography variant="body1" gutterBottom>
						Last updated: 14 November 2019
					</Typography>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = (state) => {
	return {
		showTermsModal: state.showTermsModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleTermsModal: () => dispatch(actionCreators.toggleTermsModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
