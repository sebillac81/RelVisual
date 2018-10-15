import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { ListadoPage } from '../listado/listado';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { map } from "rxjs/operators";
import { GraficoPage } from '../grafico/grafico';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ldg:Loading = null;

  constructor(public navCtrl: NavController,
    private _cap: CargaArchivoProvider,
    public _authP: AuthProvider,
    public loadingCtrl:LoadingController) {
  }

  siguiente(tiFo:string){
    this.presentLoading("Cargando imágenes...");

    setTimeout(()=>{
      this._cap.creacionList(tiFo);
      this.getImagenesList(tiFo);
      
      this.navCtrl.push(ListadoPage, {tipoFoto: tiFo});
    },1000);
  }

  getImagenesList(tiFo:string) {
    this._cap.getListaImagnes(tiFo).snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })).subscribe(imgs => {
      this._cap.imagenes = imgs;
    });
  }

  irGrafico(tiFo:string){
    this.presentLoading("Cargando gráfico...");
    setTimeout(()=>{
      this.navCtrl.push(GraficoPage, {tipoFoto: tiFo});
    },1000);
    
  }

  logout(){
    this._authP.logout();
  }

  ionViewWillLeave(){
    this.ldg.dismiss();
  }

  presentLoading(mensaje:string) {
    this.ldg = this.loadingCtrl.create({
      spinner:'dots',
      content: mensaje
    });

    this.ldg.present();
  }
}
