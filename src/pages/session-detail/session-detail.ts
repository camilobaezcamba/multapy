import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import {UserData} from "../../providers/user-data";
import {Util} from "../../providers/util";


@IonicPage({
  segment: 'session/:sessionId'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  multa: any;

  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    public user: UserData,
    public platform: Platform,
    public util: Util
  ) {}

  ionViewWillEnter() {
    this.dataProvider.loadMultas(false).subscribe((multas: any) => {
      if (
        multas
      ) {
        for (const multa of multas) {
          if (multa) {
              if (multa && multa.name === this.navParams.data.sessionId) {
                this.multa = multa;
                break;
              }
          }
        }
      }
    });
  }

  addFavorite(sessionData: any) {
    this.util.addFavorite(undefined, sessionData);
  }

  removeFavorite(sessionData: any, title: string) {
    this.util.removeFavorite(undefined, sessionData, title);
  }

  openSocial(multa: any) {
    let mensaje = multa.name + "\nMulta: " + multa.multa_monto + "\n\nDescargá la app de Multas de Paraguay\nhttp://bit.ly/multapy";
    this.util.openSocial(mensaje);
  }

  esApp(){
    return !(this.platform.is('core') || this.platform.is('mobileweb'));
  }
}
