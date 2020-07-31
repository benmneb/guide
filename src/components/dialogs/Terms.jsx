import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Terms = ({ open, onClose }) => {
  const guideTheme = useTheme();
  const fullScreen = useMediaQuery(guideTheme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="terms-dialog-title"
      aria-describedby="terms-dialog-description"
      fullScreen={fullScreen}
    >
      <DialogTitle id="terms-dialog-title">{"Terms of Use"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="terms-dialog-description">
        <p>This website and mobile application (The Vomad Guide or VOMADguide) is operated by VOMAD (we, our or us). &nbsp;It is available at: https://vomad.guide, https://vomadguide.com and may be available through other addresses or channels such as mobile applications, web widgets as well as all linked pages (collectively, Our &lsquo;Services&rsquo;).</p>
        <p>Consent: By accessing and/or using our Services, you agree to these terms of use and our Privacy Policy (Terms). Please read these Terms carefully and immediately cease using our Services if you do not agree to them.</p>
        <p>Use of our Services: We try to make the VOMADguide available to everyone. However, you cannot use our services if:</p>
        <ul>
        <li>You are under 13 years old (or the minimum legal age in your country to use our Products);</li>
        <li>We&#39;ve previously disabled your account for violations of our Terms or Policies; and</li>
        <li>You are prohibited from receiving our products, services, or software under applicable laws.</li>
        </ul>
        <p>Any information found to be collected from someone under age 13 will be deleted promptly and without notice. If you believe that we might have any information from or about a child under 13 years old, please contact us info@vomadlife.com.</p>
        <p>Variations: We may, at any time and at our discretion, vary these Terms by publishing the varied terms on our website. We recommend you check our website regularly to ensure you are aware of our current terms. Materials and information on our Services (Content) are subject to change without notice.&nbsp;</p>
        <p>By using the Vomad Guide you understand that:</p>
        <ol>
        <li>The information present on it may be, despite our best efforts, outdated or inaccurate and that we are in no way responsible for anything that might result from your use of anything listed in our services.</li>
        <li>That all external links are to completely separate entities and once you leave the Vomad Guide your experience no longer has anything to do with us.</li>
        <li>By making an account you agree to receive infrequent, relevant promotional emails from Vomad. We value privacy and will never share your details. You can unsubscribe at any time.</li>
        </ol>
        <p>Licence to use our Services: &nbsp;Unless otherwise stated, Vomad and/or its licensors own the intellectual property rights for all material on Vomad. All intellectual property rights are reserved.&nbsp;</p>
        <p>Intellectual Property: The services and contents of the website and mobile app are protected by Australian and International copyright and trademark laws. The User Contents (as defined below) are licensed to Vomad by the user.&nbsp;</p>
        <p>You may not copy or use, in whole or in part, any content for commercial purposes, reproduce, retransmit, distribute, disseminate, sell, publish, broadcast or circulate any Content to any third party; or breach any intellectual property rights connected with our Site or the Content, including (without limitation) altering or modifying any of the Content, causing any of the Content to be framed or embedded in another website or platform, or creating derivative works from the Content without Vomad&rsquo;s written consent.&nbsp;</p>
        <p>You may download, print and copy a limited amount of content from our services, for your personal, non-commercial use only, provided that&nbsp;</p>
        <p>(a) you include, without modification, all copyright and other proprietary notices contained in the content,<br />(b) you do not modify the content,<br />(c) you do not use the content in a manner that suggests Vomad promotes or endorses your, or any third party&rsquo;s causes, ideas, websites, products or services, and<br />(d) you do not use the content in any way that is unlawful or harmful to any other person or entity.</p>
        <p>You may also use apps, widgets and other tools available on our Services that allow selected User Contents to appear on your mobile device, personal, non-commercial website, blogs or other application, subject to the conditions subject to having no quotes from any content that may be used in any media without attribution to Vomad and/or vomad.guide.</p>
        <p>Prohibited conduct: You must not do or attempt to do anything: that is unlawful; prohibited by any laws applicable to our Site; which we would consider inappropriate; or which might bring us or our Services into disrepute, including (without limitation):</p>
        <p>(a) anything that would constitute a breach of an individual&rsquo;s privacy (including uploading private or personal information without an individual&#39;s consent) or any other legal rights;<br />(b) using our Services to defame, harass, threaten, menace or offend any person;<br />(c) interfering with any user using our Services;<br />(d) tampering with or modifying our Services, knowingly transmitting viruses or other disabling features, or damaging or interfering with our Site, including (without limitation) using trojan horses, viruses or piracy or programming routines that may damage or interfere with our Services;<br />(e) using our Services to send unsolicited email messages; or<br />(f) &nbsp; &nbsp; facilitating or assisting a third party to do any of the above acts.</p>
        <p>Cookies: We employ the use of cookies. By using the Vomad Guide you consent to the use of cookies in accordance with Vomad&#39;s privacy policy. Most of the modern-day interactive websites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate/advertising partners may also use cookies.</p>
        <p>User Reviews: Certain parts of this website offer the opportunity for users to post reviews, make recommendations and exchange opinions, information, material and data (&lsquo;Reviews&rsquo;) in areas of the website. Vomad does not screen, edit, publish or review the Reviews prior to their appearance on the website and Reviews do not reflect the views or opinions of Vomad, its agents or affiliates. Reviews reflect the view and opinion of the person who posts such view or opinion.</p>
        <p>To the extent permitted by applicable laws Vomad shall not be responsible or liable for the Reviews or for any loss, cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Reviews on this website.</p>
        <p>Vomad reserves the right to monitor all reviews and to remove any comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.</p>
        <p>You warrant and represent that:</p>
        <p>You are entitled to post the Reviews on our website and have all necessary licenses and consents to do so;</p>
        <p>The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary rights of any third party;</p>
        <p>The Reviews do not contain any defamatory, libellous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy</p>
        <p>The Reviews will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</p>
        <p>You hereby grant to Vomad a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Reviews in any and all forms, formats or media.</p>
        <p>User Content: You may be permitted to post, upload, publish, submit or transmit relevant information and content (User Content) on our Services. &nbsp;By making available any User Content on or through our Site, you grant to us a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free licence to use the User Content, with the right to use, view, copy, adapt, modify, distribute, license, sell, transfer, communicate, publicly display, publicly perform, transmit, stream, broadcast, access, or otherwise exploit such User Content on, through or by means of our Services.</p>
        <p>You agree that you are solely responsible for all User Content that you make available on or through our Services. &nbsp;You represent and warrant that:</p>
        <p>(a) you are either the sole and exclusive owner of all User Content or you have all rights, licences, consents and releases that are necessary to grant to us the rights in such User Content (as contemplated by these Terms); and</p>
        <p>(b) neither the User Content nor the posting, uploading, publication, submission or transmission of the User Content or our use of the User Content on, through or by means of our Services will infringe, misappropriate or violate a third party&rsquo;s intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.</p>
        <p>We do not endorse or approve, and are not responsible for any User Content. We may, at any time (at our sole discretion), remove any User Content.</p>
        <p>You further grant Vomad to use your member name, city and state, and other information that you have provided in connection with the User Content as defined in our Privacy Policy.</p>
        <p>Iframes: Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our website and mobile application.</p>
        <p>Content Liability: We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Website or within any context containing content or materials that may be interpreted as libellous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
        <p>Disclaimer: To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill).</p>
        <p>Nothing in this disclaimer will:</p>
        <p>limit or exclude our or your liability for death or personal injury resulting from negligence;</p>
        <p>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</p>
        <p>limit any of our or your liabilities in any way that is not permitted under applicable law; or exclude any of our or your liabilities that may not be excluded under applicable law.</p>
        <p>The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer:&nbsp;</p>
        <p>are subject to the preceding paragraph; and</p>
        <p>govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.</p>
        <p>To the extent that the website/app and the information and services are provided as a reference only, we will not be liable for any loss or damage of any nature.</p>
        <p>Limitation of liability: To the maximum extent permitted by law, we are not responsible for any loss, damage or expense, howsoever arising, whether direct or indirect and/or whether present, unascertained, future or contingent (Liability) suffered by you or any third party, arising from or in connection with your use of our Services and/or the Content and/or any inaccessibility of, interruption to or outage of our Services and/or any loss or corruption of data and/or the fact that the Content is incorrect, incomplete or out-of-date.&nbsp;</p>
        <p>Discontinuance: We may, at any time and without notice to you, discontinue our Services, in whole or in part. &nbsp;We may also exclude any person from using our Services, at any time and at our sole discretion. We are not responsible for any liability you may suffer arising from or in connection with any such discontinuance or exclusion.</p>
        <p>Termination: These Terms are effective until terminated by us, which we may do at any time and without notice to you. &nbsp;In the event of termination, all restrictions imposed on you by these Terms and limitations of liability set out in these Terms will survive.</p>
        <p>Severance: If a provision of these Terms is held to be void, invalid, illegal or unenforceable, that provision must be read down as narrowly as necessary to allow it to be valid or enforceable. If it is not possible to read down a provision (in whole or in part), that provision (or that part of that provision) is severed from these Terms without affecting the validity or enforceability of the remainder of that provision or the other provisions in these Terms.</p>
        <p>Jurisdiction: Your use of our Site and these Terms are governed by the laws of Western Australia. You irrevocably and unconditionally submit to the exclusive jurisdiction of the courts operating in Western Australia and any courts entitled to hear appeals from those courts and waive any right to object to proceedings being brought in those courts.</p>
        <p>Our Site may be accessed throughout Australia and overseas. &nbsp;We make no representation that our Site complies with the laws (including intellectual property laws) of any country outside Australia. &nbsp;If you access our Site from outside Australia, you do so at your own risk and are responsible for complying with the laws of the jurisdiction where you access our Site.</p>
        <p>For any questions and notices, please contact us at:</p>
        <p>Vomad</p>
        <p>ABN: 49 625 878 826</p>
        <p>Email: info@vomadlife.com</p>
        <p>Last updated: 14 November 2019</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Terms;
