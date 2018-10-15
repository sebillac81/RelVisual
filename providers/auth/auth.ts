import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    
  }

  // Registro de usuario
  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // El usuario se ha creado correctamente.
      })
      .catch(err => Promise.reject(err))
  }

  loginUser(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err))
  }
  // Devuelve la session
  get Session() {
    return this.afAuth.authState;
  }
  // Logout de usuario
  logout() {
    this.afAuth.auth.signOut().then(() => {
      //console.log(this.afAuth.authState);
      // hemos salido
    })
  }


}