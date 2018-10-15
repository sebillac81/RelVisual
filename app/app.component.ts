import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen, private auth: AuthProvider) {
    
    // platform.ready().then(() => {
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });

    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.Session.subscribe(session => {

      
      if (session) {
        console.log(session.email);
        console.log(session.uid);
        this.rootPage = HomePage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });
  }
}

