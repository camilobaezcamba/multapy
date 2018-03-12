import { Injectable } from '@angular/core';

import {AlertController, ItemSliding, ToastController} from 'ionic-angular';
import {UserData} from "./user-data";
import {SocialSharing} from "@ionic-native/social-sharing";


@Injectable()
export class Util {

  constructor(
    public user: UserData,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private socialSharing: SocialSharing
  ) {}

  addFavorite(slidingItem: ItemSliding| undefined, sessionData: any, callback?: () => void) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Ya es un favorito', callback);
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);
      const toast = this.toastCtrl.create({
        message: 'Agregado a favoritos.',
        duration: 3000
      });
      toast.present();
      if(slidingItem) {
        setTimeout(() => {
          slidingItem.close();
        });
      }
    }
  };

  removeFavorite(slidingItem: ItemSliding | undefined, sessionData: any, title: string, callback?: () => void) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Le gustaría quitar de sus favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            if(slidingItem) {
              setTimeout(() => {
                slidingItem.close();
              });
            }
          }
        },
        {
          text: 'Quitar',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);

            // close the sliding item and hide the option buttons
            if(slidingItem) {
              setTimeout(() => {
                slidingItem.close();
              });
            }
            if(callback) {
              callback();
            }

          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(mensaje: string) {
    this.socialSharing.share(mensaje).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

}
