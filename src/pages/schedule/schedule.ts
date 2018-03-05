import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, NavController, ToastController, Refresher, Platform } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class MultasPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSessions = 0;
  groups: any = [];
  loaded: boolean;
  loading: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    private socialSharing: SocialSharing,
    public platform: Platform
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Multa');
    this.user.getFavorites();
    this.updateSchedule(true);
  }

  ionViewWillEnter() {
    if(this.loaded){
      this.updateSchedule();
    }
  }

  updateSchedule(force = false) {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    /*this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });*/

    this.loading = true;
    this.confData.getMultas(this.queryText, this.segment, force).subscribe((data: any) => {
      this.shownSessions = 0;
      if(data && data.constructor === Array ){
        data.forEach((multa: any) => {
            if (!multa.hide) {
              // if this session is not hidden then this group should show
              this.shownSessions++;
            }
        });
      }
      this.groups = data;
      this.loaded = true;
      this.loading = false;
      },
      () => {
        this.loading = false;
        this.showErrorToast();
      });
  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.name, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Ya es un favorito');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      /*let alert = this.alertCtrl.create({
        title: 'Favorito Agregado',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });*/
      // now present the alert on top of all other content
      //alert.present();
      const toast = this.toastCtrl.create({
        message: 'Agregado a favoritos.',
        duration: 3000
      });
      toast.present();
      slidingItem.close();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Le gustaría quitar de sus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Quitar',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial() {
    let mensaje = "Descargá la app de Multas de Paraguay\nhttp://bit.ly/multapy";
    this.socialSharing.share(mensaje).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    /*
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
    */
  }

  doRefresh(refresher: Refresher) {
    this.confData.getMultas(this.queryText, this.segment, true).subscribe((data: any) => {
      this.groups = data;
      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Las multas han sido actualizadas.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    }, () => {
      // simulate a network request that would take longer
      // than just pulling from out local json file
      this.showErrorToast(refresher);
    });
  }

  showErrorToast(refresher?: Refresher){
    setTimeout(() => {
      if(refresher) {
        refresher.complete();
      }
      const toast = this.toastCtrl.create({
        message: 'Error de conexión. No se actualizaron las multas.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }

  esApp(){
    return !(this.platform.is('core') || this.platform.is('mobileweb'));
  }
}
