import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from 'src/app/common/common.module';

// routing
import { LandingRouting } from './routing/landing.routing';

// containers
import { AboutUsComponent } from './containers/about-us/about-us.component';
import { FairPlayComponent } from './containers/fair-play/fair-play.component';
import { FaqComponent } from './containers/faq/faq.component';
import { HowToComponent } from './containers/how-to/how-to.component';
import { PackagesComponent } from './containers/packages/packages.component';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './containers/contact-us/contact-us.component';

// components
import { AboutUsViewComponent } from './components/about-us-view/about-us-view.component';
import { FairPlayViewComponent } from './components/fair-play-view/fair-play-view.component';
import { FaqViewComponent } from './components/faq-view/faq-view.component';
import { HowToViewComponent } from './components/how-to-view/how-to-view.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';
import { PrivacyPolicyViewComponent } from './components/privacy-policy-view/privacy-policy-view.component';
import { SuggestedVideosComponent } from './components/how-to-view/suggested-videos/suggested-videos.component';
import { VideoPlayerComponent } from './components/how-to-view/video-player/video-player.component';
import { ContactUsViewComponent } from './components/contact-us-view/contact-us-view.component';

// dialogs
import { PackagePaymentComponent } from './components/dialogs/package-payment/package-payment.component';
import { TermsAndConditionsViewComponent } from './components/terms-and-conditions-view/terms-and-conditions-view.component';
import { TermsAndConditionsComponent } from './containers/terms-and-conditions/terms-and-conditions.component';
import { RefundPolicyViewComponent } from './components/refund-policy-view/refund-policy-view.component';
import { RefundPolicyComponent } from './containers/refund-policy/refund-policy.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { VerifyComponent } from './containers/verify/verify.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuItemComponent } from './components/main-menu-item/main-menu-item.component';
import { MainTemplateComponent } from './containers/main-template/main-template.component';
import { HomeComponent } from './containers/home/home.component';

@NgModule({
	imports: [CommonModule, LandingRouting, ReactiveFormsModule],
	declarations: [
		// containers
		AboutUsComponent,
		FairPlayComponent,
		FaqComponent,
		HowToComponent,
		PrivacyPolicyComponent,
		// components
		AboutUsViewComponent,
		FairPlayViewComponent,
		FaqViewComponent,
		HowToViewComponent,
		LandingFooterComponent,
		PrivacyPolicyViewComponent,
		SuggestedVideosComponent,
		VideoPlayerComponent,
		ContactUsComponent,
		ContactUsViewComponent,
		// dialogs
		PackagePaymentComponent,
		TermsAndConditionsViewComponent,
		TermsAndConditionsComponent,
		RefundPolicyViewComponent,
		RefundPolicyComponent,
		LoginComponent,
		SignupComponent,
		VerifyComponent,
		MainMenuComponent,
		MainMenuItemComponent,
		MainTemplateComponent,
		HomeComponent
	],
	entryComponents: [PackagePaymentComponent]
})
export class LandingModule {}
