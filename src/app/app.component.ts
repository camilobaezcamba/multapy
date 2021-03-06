import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { MultasPage } from '../pages/schedule/schedule';

import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Multas', name: 'TabsPage', component: TabsPage, tabComponent: MultasPage, index: 0, icon: 'ios-hand' },
    { title: 'Acerca de', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 1, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages = [
    { title: 'ANTSV', name: 'Agencia Nacional de Tránsito y Seguridad Vial', link: 'http://www.antsv.gov.py/', icon: 'md-globe' },
    { title: 'MOPC', name: 'Ministerio de Obras Públicas y Comunicaciones', link: 'http://www.mopc.gov.py', icon: 'md-globe' },
    { title: 'Caminera', name: 'Dirección Nacional de la Patrulla Caminera', link: 'http://www.caminera.gov.py/', icon: 'md-globe' }
  ];

  documentos = [
    { title: 'Ley 5016/14', link: 'https://drive.google.com/open?id=0B1pX23qoWoX0ZTg2LThqc21ENlE', icon: 'ios-document' },
    { title: 'Listado de infracciones', link: 'https://drive.google.com/open?id=0B1pX23qoWoX0TnY0MzhCb0g0RDg', icon: 'ios-document-outline' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    this.rootPage = TabsPage;
    this.platformReady();
    this.enableMenu(false);
    }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openLink(link: any) {
    window.open(link, '_system', 'location=yes')
  }

  openTutorial() {
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
