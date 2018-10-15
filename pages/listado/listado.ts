import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { TomarFotoPage } from '../tomar-foto/tomar-foto';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  public tipoFoto:string;
  img:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _cap: CargaArchivoProvider, 
    private auth: AuthProvider) {

      this.tipoFoto = this.navParams.get("tipoFoto");
  }

  mostrarModal(){
    let modal = this.modalCtrl.create( TomarFotoPage, {tipoFoto: this.tipoFoto} );
    modal.present();
  }

  sumarVoto(key:string, votos:number){
    let clave:string;

    clave = (parseInt(key) * -1).toString();

    //paso key de la imagen y la cant de votos
    this._cap.validarVoto(clave, votos);
  }

  verColor(key:string):string{
    let color:string = "gris";

    if(this._cap.userVotosList.find(img => img.imagen==(parseInt(key)*-1).toString()))
      color="primary";

    return color;
  }

  salir(){
    this.auth.logout();
  }

}