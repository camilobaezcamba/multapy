import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

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
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((multas: any) => {
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
}
