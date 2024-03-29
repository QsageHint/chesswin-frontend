import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// modules
import { FacadeModule } from 'facade-module';
import { CommonModule } from 'common-module';

// guards
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { GameGuard } from '../guards/game.guard';
import { HomeGuard } from '../guards/home.guard';

// routing
import { AppRouting } from './routing/app.routing';

// services
import { CookieService } from 'ngx-cookie-service';

// containers
import { AppComponent } from './containers/app/app.component';

// components
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SidenavLogButtonComponent } from './components/sidenav-log-button/sidenav-log-button.component';

@NgModule({
	declarations: [AppComponent, NotFoundComponent, SidenavComponent, ProfileViewComponent, SidenavItemComponent, SidenavLogButtonComponent],
	imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FacadeModule, CommonModule, AppRouting],
	providers: [AdminGuard, AuthGuard, GameGuard, HomeGuard, CookieService],
	bootstrap: [AppComponent]
})
export class AppModule {}
