import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { MultasPage } from '../pages/schedule/schedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { TabsPage } from '../pages/tabs-page/tabs-page';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MultaComponent } from '../directives/multa/multa.component';
import {Util} from "../providers/util";


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    PopoverPage,
    MultasPage,
    SessionDetailPage,
    TabsPage,
    MultaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {backButtonText: 'Atrás'}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: MultasPage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: AboutPage, name: 'About', segment: 'about' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    PopoverPage,
    MultasPage,
    SessionDetailPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    Util,
    InAppBrowser,
    SplashScreen,
    SocialSharing
  ]
})
export class AppModule { }
