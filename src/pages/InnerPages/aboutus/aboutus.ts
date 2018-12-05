import { Component } from '@angular/core';
import { Loading, LoadingController, ViewController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';

@Component({
    selector: 'page-aboutus',
    templateUrl: 'aboutus.html'
})
export class AboutusPage {
    msg: string;
    loading: Loading;
    schooldetail;

    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, public viewCtrl: ViewController) {
        this.GetSchoolDetail();
    }

    GetSchoolDetail() {
        this.showLoading();
        this.loading.present().then(() =>
            this._crud.get("appdetail/GetSchoolDetail")
                .subscribe(
                record => {
                    this.schooldetail = record;
                    this.loading.dismiss();
                },

                error => {
                    this.loading.dismiss();
                }));
    }
   

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        //this.loading.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
