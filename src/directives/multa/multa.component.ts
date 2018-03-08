import { Component , Input}  from '@angular/core';
import { UserData } from "../../providers/user-data";
import {Util} from "../../providers/util";
import {Platform} from "ionic-angular";

class Multa {
  public name: string;
  public multa_jornal: string;
  public multa_monto: string;
  public demorar_vehiculo: string;
  public ley_articulo: string;

  constructor(name: string, multa_jornal: string, multa_monto: string, demorar_vehiculo: string, ley_articulo: string) {
    this.name = name;
    this.multa_jornal = multa_jornal;
    this.multa_monto = multa_monto;
    this.demorar_vehiculo = demorar_vehiculo;
    this.ley_articulo = ley_articulo;
  }
}

@Component({
  selector: 'multa',
  templateUrl: 'multa.html'
})
export class MultaComponent {
  @Input('multa') multa: Multa;

  constructor(
    public user: UserData,
    public util: Util,
    public platform: Platform
  ) {}

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


