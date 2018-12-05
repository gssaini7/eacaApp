import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../services/crudservice';
import { AuthServices } from '../../services/auth-service';
//import { HomePage } from '../home/home';
import { DashboardPage } from '../Dashboard/Dashboard';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
    msg: string;
    loading: Loading;
    isOTPpart: boolean = false;

    registerCredentials = { Mobile: '', dbcode: '' };
    OTPCredentials = { Mobile: '', dbcode: '', OTP: '' };

   

    constructor(public nav: NavController, private _crud: CrudServices, private _authservice: AuthServices, public loadingCtrl: LoadingController) {

        if (this._authservice.gs_hasToken()) {
            nav.setRoot(DashboardPage);
        }
    }
  

    public login() {
        this.msg = "";
        this.isOTPpart = false;
        this.showLoading();
        this._crud.post("appdetail/AppLogin", this.registerCredentials).subscribe(records => {
            if (records.ok)
                this.isOTPpart = true;
            this.loading.dismiss();

        },
            error => { this.msg = <any>error; this.loading.dismiss(); });
    }

    public confirmOTP() {
        this.showLoading();

        this.msg = "";
        this.OTPCredentials.Mobile = this.registerCredentials.Mobile;
        this.OTPCredentials.dbcode = this.registerCredentials.dbcode;

        this._crud.post("appdetail/OTPLogin", this.OTPCredentials).subscribe(records => {
            if (records.ok) {
              
                let details = JSON.parse(records._body);
                this._crud.setStorage('auth_token', details.access_token);
                this._crud.setStorage('dbcodeid', details.dbcodeid);
                this._crud.setStorage('usermobile', details.usermobile);

                //localStorage.setItem('auth_token', details.access_token);
                //localStorage.setItem('dbcodeid', details.dbcodeid);
                //localStorage.setItem('usermobile', details.usermobile);
             

                this.isOTPpart = false;
                this.loading.dismiss();

               

                this.nav.setRoot(DashboardPage);
            }
        },
            error => { this.msg = <any>error; this.loading.dismiss(); });
    }

    resendotp() {
        this.showLoading();
        this.loading.present().then(() =>
            this._crud.post("appdetail/ResendOTP", this.registerCredentials).subscribe(records => {
                if (records.ok) {
                    this.loading.dismiss();

                }
        },
            error => { this.msg = <any>error; this.loading.dismiss(); })
        );
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
 
}
