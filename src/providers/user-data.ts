import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  _multas: Object[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  getMultas(): Promise<any> {
    return this.storage.get("_multas").then((data) => {
      this._multas = data || [];
      return this._multas;
    });
  };

  setMultas(multas: any): void {
    this.storage.set("_multas", multas);
  };

  getFavorites(): void {
    this.storage.get("_favorites").then((data) => {
      this._favorites = data || [];
    });
  };

  hasFavorite(sessionName: string): boolean {
    if(this._favorites == null){
      return false;
    }else{
      return (this._favorites.indexOf(sessionName) > -1);
    }
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
    this.storage.set("_favorites", this._favorites);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
    this.storage.set("_favorites", this._favorites);
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
