//import { Component } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

import { CrudServices } from '../services/crudservice';

//@Component({
  
//})
@Injectable()

export class AuthServices  {

    private loggedIn = this.gs_hasToken();
    //// Observable navItem source
    //private _authNavStatusSource = new BehaviorSubject<boolean>(this.loggedIn);

   

    constructor(private _crud: CrudServices) {
    }

    logout() {

        this._crud.removeStorage('auth_token');
        this._crud.removeStorage('dbcodeid');
        this._crud.removeStorage('usermobile'); 
        this._crud.removeStorage('currentstudentid');
        this._crud.removeStorage('currentstudentname');


        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }  

    gs_hasToken(): boolean {
        return !!this._crud.getStorage('auth_token');
    }

    CurrenStudentName() {
        let csn = this._crud.getStorage('currentstudentname');

        if (csn === null)
            return "";
        return csn;
    }
   
    

}
