import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-tomar-foto',
  templateUrl: 'tomar-foto.html',
})

export class TomarFotoPage {

  titulo: string = "";
  //imagenPreview: string = "";
  //imagen64: string;
  // ijvoidjvodijvsoivjdoj
  tipoFoto:string;
  ldg:Loading = null;

  imgList: Iimagen[]=[];
  mostrar:boolean=false;

  constructor(public navCtrl: NavController, 
              private camera: Camera,
              public navParams: NavParams, 
              public viewCtrl: ViewController,
              public _cap: CargaArchivoProvider,
              public toastCtrl: ToastController,
              public loadingCtrl:LoadingController) {

                this.tipoFoto = this.navParams.get("tipoFoto");

      let img:Iimagen = {
        imagenPreview: '../../assets/imgs/sinImg.png',
        imagen64:"",
        titulo: "tit1"
      }

      this.imgList.push(img);

      let img2:Iimagen = {
        imagenPreview: '../../assets/imgs/sinImg.png',
        imagen64:"",
        titulo: "titulo2"
      }

      this.imgList.push(img2);

      let img3:Iimagen = {
        imagenPreview: '../../assets/imgs/sinImg.png',
        imagen64:"",
        titulo: "titulo3"
      }

      this.imgList.push(img3);
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  mostrarCamara(){

    let popoverOptions: CameraPopoverOptions = {
      x: 0,
      y: 0,
      width: 800,
      height: 800,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_DOWN
  };

    const options: CameraOptions = {
        quality: 40,
        targetWidth: 800,
        targetHeight: 800,
        allowEdit: false,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        cameraDirection: this.camera.Direction.BACK,
        destinationType: this.camera.DestinationType.DATA_URL, 
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE//,
        //popoverOptions: popoverOptions
    }

    this.camera.getPicture(options).then((imageData) => {

      if(!this.mostrar) //si es la primera vez que guardo una imagen, saco la que viene por default
        this.imgList.pop();

     let img:Iimagen = {
       imagenPreview:'data:image/jpeg;base64,' + imageData,
       imagen64:imageData,
       titulo: this.titulo
     }

     this.imgList.push(img);
     this.mostrar = true;
     this.titulo = "";
    }, (err) => {
     // Handle error
     this.mostrarMensaje("Error en la cámara:" + JSON.stringify(err));
    });
  }

  // mostrarCamara(){

  //   let popoverOptions: CameraPopoverOptions = {
  //     x: 0,
  //     y: 0,
  //     width: 800,
  //     height: 800,
  //     arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
  // };

  //   const options: CameraOptions = {
  //       quality: 50,
  //       targetWidth: 800,
  //       targetHeight: 800,
  //       allowEdit: false,
  //       correctOrientation: true,
  //       saveToPhotoAlbum: false,
  //       cameraDirection: this.camera.Direction.BACK,
  //       destinationType: this.camera.DestinationType.DATA_URL, 
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       popoverOptions: popoverOptions
  //     }

  //   this.camera.getPicture(options).then((imageData) => {

  //    this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
  //    this.imagen64 = imageData;

  //   }, (err) => {
  //    // Handle error
  //    this.mostrarMensaje("Error en la cámara:" + JSON.stringify(err));
  //   });
  // }

  mostrarMensaje(mensaje:string){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    }).present();
  }

  cargarImagen(){

    if(this.imgList.length > 1)
      this.presentLoading('Guardando imágenes...');
    else
      this.presentLoading('Guardando imagen...');

    for (let i = 0; i < this.imgList.length; i++) {
      const img = this.imgList[i];

      this._cap.cargarImagenFirebase(img.imagen64, this.tipoFoto, img.titulo)
      .then(()=>{

        if(i==this.imgList.length-1)
          this.cerrarModal();
      });
    }
  }

  ionViewWillLeave(){
    if(this.ldg != null)
        this.ldg.dismiss();
  }
 
  presentLoading(mensaje:string) {
    this.ldg = this.loadingCtrl.create({
      spinner:'dots',
      content: mensaje
    });

    this.ldg.present();
  }

  eliminar(img:Iimagen){
    console.log(this.imgList);
  
    this.imgList = this.imgList.splice(this.imgList.indexOf(img),1).slice();

    console.log(this.imgList);
  }
}

export interface Iimagen{
  imagenPreview:string;
  imagen64:string;
  titulo:string;
}
