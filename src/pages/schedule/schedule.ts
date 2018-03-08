import { Component, ViewChild } from '@angular/core';

import { App, ItemSliding, List, NavController, ToastController, Refresher, Platform } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import {Util} from "../../providers/util";

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
  loaded: boolean = false;
  loading: boolean = false;
  detallado: boolean = false;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public util: Util,
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

  toggleDetallado(){
    this.detallado = !this.detallado;
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
        if(!this.loaded){
           this.user.getMultas().then((multas) => {
             if(multas != null && multas != undefined && multas.length > 0){
               this.confData.data = multas;
               this.groups = multas;
               this.loading = false;
               if(multas && multas.constructor === Array ){
                 multas.forEach((multa: any) => {
                   if (!multa.hide) {
                     // if this session is not hidden then this group should show
                     this.shownSessions++;
                   }
                 });
               }
               this.showToast("Error de conexión. Recuperadas de última sesión");
             }else{
               this.showErrorToast();
             }
           }, () => {
             this.showErrorToast();
           });
        }

      });
  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.name, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {
    this.util.addFavorite(slidingItem, sessionData, () => this.updateSchedule());
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    this.util.removeFavorite(slidingItem, sessionData, title, () => this.updateSchedule());
  }

  openSocial() {
    let mensaje = "Descargá la app de Multas de Paraguay\nhttp://bit.ly/multapy";
    this.util.openSocial(mensaje);
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

  showToast(mensaje?: string){
      const toast = this.toastCtrl.create({
        message: mensaje || 'Error de conexión. No se actualizaron las multas.',
        duration: 3000
      });
      toast.present();
  }

  esApp(){
    return !(this.platform.is('core') || this.platform.is('mobileweb'));
  }
}
