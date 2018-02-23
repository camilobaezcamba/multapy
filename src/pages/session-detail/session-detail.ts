import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams, ToastController} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import {UserData} from "../../providers/user-data";

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
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    public user: UserData
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

  addFavorite(sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(sessionData, 'Ya es un favorito');
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
    }

  }

  removeFavorite(sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Le gustaría quitar de sus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
          }
        },
        {
          text: 'Quitar',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);

            // close the sliding item and hide the option buttons
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }
}
