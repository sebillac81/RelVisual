import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GraficoPage } from '../pages/grafico/grafico';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPageModule } from '../pages/login/login.module';


//
//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { ListadoPageModule } from '../pages/listado/listado.module';

//plugin
import { Camera } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { TomarFotoPageModule } from '../pages/tomar-foto/tomar-foto.module';
//import { GraficoPageModule } from '../pages/grafico/grafico.module';
import { ChartsModule } from "ng2-charts";


export const firebaseConfig={
  apiKey: "AIzaSyCVyCBnDgPpJugSIBQLsykkSquDMNu53tE",
  authDomain: "relvisual-152b4.firebaseapp.com",
  databaseURL: "https://relvisual-152b4.firebaseio.com",
  projectId: "relvisual-152b4",
  storageBucket: "relvisual-152b4.appspot.com",
  messagingSenderId: "338240467264"

  // apiKey: "AIzaSyB68Tzd0B2U7jGoHBk2H_HPoRMuNsVlpP0",
  // authDomain: "readqr-680b5.firebaseapp.com",
  // databaseURL: "https://readqr-680b5.firebaseio.com",
  // projectId: "readqr-680b5",
  // storageBucket: "readqr-680b5.appspot.com",
  // messagingSenderId: "717661060481"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GraficoPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    ListadoPageModule,
    TomarFotoPageModule,
   // GraficoPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraficoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CargaArchivoProvider
  ]
})
export class AppModule {}
