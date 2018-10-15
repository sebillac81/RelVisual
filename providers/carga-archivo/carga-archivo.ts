import { Injectable, ComponentFactoryResolver } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from 'firebase';

import { ToastController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';
import { ArchivoSubir } from '../../model/archivoSubir';

@Injectable()
export class CargaArchivoProvider {

  public imagenes: any;
  public imagenesL: any;
  public imagenesF: any;
  imgsRef: AngularFireList<ArchivoSubir> = null;
  userVotosList: Array<any>;
  lindasRef: AngularFireList<ArchivoSubir> = null;
  email: string;
  uid: string;

constructor(
  public toastCtrl: ToastController,
  public afDB: AngularFireDatabase, 
  private auth: AuthProvider) {
    this.auth.Session.subscribe(session => {

      if(session != null) {    
        this.email = session.email;
        this.uid = session.uid.toString();

        this.getuserVotos();
      }
    });
}

cargarImagenFirebase( img:string, tipoFoto: string, titulo:string){

  let promesa = new Promise( (resolve, reject)=>{

    // this.mostrarMensaje('Cargando...');
    let storeRef = firebase.storage().ref();
    let nombreArchivo:string = new Date().valueOf().toString(); // 1231231231

    let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${ nombreArchivo }`)
                .putString( img, 'base64', { contentType: 'image/jpeg' }  );

        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{ }, // saber el % de cuantos Mbs se han subido
          ( error ) =>{
            // manejo de error
            this.mostrarMensaje(JSON.stringify( error ));
            reject();
          }, ()=>{
            // TODO BIEN!!
            uploadTask.snapshot.ref.getDownloadURL().then(( url )=>{
              // this.mostrarMensaje('Imagen cargada correctamente');
              this.subirFoto(url, nombreArchivo, tipoFoto, titulo);
              resolve();
            });

            resolve();
          }
        )
  });

  return promesa;
}

creacionList(tipoFoto:string){
  this.imgsRef = this.afDB.list('/imagenes' + tipoFoto, ref=> ref.orderByChild("key"));
}

getImagenesListVoto(tipoFoto:string){
  return this.afDB.list('/imagenes'  + tipoFoto, ref=> ref.orderByChild("votos").startAt(1)).valueChanges();
}

getListaImagnes(tipoFoto:string): AngularFireList<ArchivoSubir> {
  return this.imgsRef;
}

getuserVotos(){
  //obtengo los votos del usuario
  //console.log(this.uid);
  this.afDB.list('/userVotos/' + this.uid).valueChanges().subscribe(data=>{
    this.userVotosList = data;
    //console.log(this.userVotosList);
  });
  
}

validarVoto(key:string, votos:number){
  let existe:boolean=false;


  for (let i = 0; i < this.userVotosList.length; i++) {

    //console.log(this.userVotosList[i].imagen);
    //console.log(key);
    if(this.userVotosList[i].imagen == key)
      existe=true;
  }

  if(existe) { //tengo que restar un voto y eliminar la relacion
    this.deleteImg(key);
    this.updateList(key, { votos: votos - 1 });

  }else{ //tengo que sumar un voto y creo la relacion user/img
    
    this.afDB.object('/userVotos/' + this.uid + '/' + key).update({imagen: key}); 
    this.updateList(key, { votos: votos + 1 });
  }
}

//Elimino la relacion Usuario / Imagen (resta voto)
deleteImg(key: string): void {
  this.afDB.object('/userVotos/' + this.uid + '/' + key).remove();
}

updateList(key: string, votos: any): void {

  this.imgsRef.update(key, votos).catch(error => this.mostrarMensaje(error));
}

private subirFoto(url: string, nombreArchivo:string, tipo: string, titulo:string){

  let imgNueva: ArchivoSubir = {
    img: url,
    titulo: titulo,
    key: parseInt(nombreArchivo) * -1,
    usuario: this.email,
    votos:0,
    fecha: new Date().toISOString()
  };

  try {
    this.afDB.object(`/imagenes` + tipo + `/${ nombreArchivo }`).update(imgNueva); 
    this.imagenes.push( imgNueva );
  } catch (error) {
    this.mostrarMensaje("Errro:" + error);
  }
}

mostrarMensaje(mensaje:string){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }
}

export interface Iimagen{
  imagenPreview:string;
  imagen64:string;
  titulo:string;
}