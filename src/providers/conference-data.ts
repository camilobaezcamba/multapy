import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ConferenceData {
  data: any;

  constructor(public http: Http, public user: UserData) { }

  loadMultasForce(): any {
      return this.http.get('https://polifaces.altervista.org/multas.php')
        .map(this.processDataMultas, this);
  }

  loadMultas(force: boolean): any {
    if(force) {
      return this.loadMultasForce();
    } else if (this.data) {
        return Observable.of(this.data);
    } else {
        return this.loadMultasForce();
    }
  }

  processDataMultas(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();
    return this.data;
  }

  getMultas(queryText = '', segment = 'all', force = false) {
    return this.loadMultas(force).map((data: any) => {

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      if(data && data.constructor === Array ){
        data.forEach((multa: any) => {
          multa.name = multa.infraccion;
          this.filterSessionMultas(multa, queryWords, segment);
        });
      }

      return data;
    });
  }

  filterSessionMultas(multa: any, queryWords: string[], segment: string) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (multa.infraccion.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }
    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(multa.infraccion)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    multa.hide = !(matchesQueryText && matchesSegment);
  }

}
