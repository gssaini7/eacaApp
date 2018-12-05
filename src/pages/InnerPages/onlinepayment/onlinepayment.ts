import { Component } from '@angular/core';
import { InAppBrowser  } from '@ionic-native/in-app-browser';
import { Loading, LoadingController } from 'ionic-angular';
import { CrudServices } from '../../../services/crudservice';
import { OnlinePaymentModel } from '../../../models/model.interface';

@Component({
    selector: 'page-onlinepayment',
    templateUrl: 'onlinepayment.html'
})
export class onlinepaymentPage {
    msg: string;
    loading: Loading;
    currentstudent;
    opmodel: OnlinePaymentModel = { StudentModelID: '', feeamount:null , remarks: '' };
    //options: InAppBrowserOptions = {
    //    location: 'yes',//Or 'no' 
    //    hidden: 'no', //Or  'yes'
    //    clearcache: 'yes',
    //    clearsessioncache: 'yes',
    //    zoom: 'yes',//Android only ,shows browser zoom controls 
    //    hardwareback: 'yes',
    //    mediaPlaybackRequiresUserAction: 'no',
    //    shouldPauseOnSuspend: 'no', //Android only 
    //    closebuttoncaption: 'Close', //iOS only
    //    disallowoverscroll: 'no', //iOS only 
    //    toolbar: 'yes', //iOS only 
    //    enableViewportScale: 'no', //iOS only 
    //    allowInlineMediaPlayback: 'no',//iOS only 
    //    presentationstyle: 'pagesheet',//iOS only 
    //    fullscreen: 'yes',//Windows only    
    //};

    //texts;
    //texts2;


    constructor(private _crud: CrudServices, public loadingCtrl: LoadingController, private theInAppBrowser: InAppBrowser) {
        this.GetAllChilds();
    }

    GetAllChilds() {
        this.msg = "";
        this.showLoading();
        this.loading.present().then(() =>
            this._crud.get("appdetail/GetAllChilds").subscribe(records => {

                let currentstudedntid = this._crud.getStorage('currentstudentid');
                this.currentstudent = records.filter(s => s.StudentModelID == currentstudedntid)[0];
                this.loading.dismiss();

            },
                error => {
                    this.msg = <any>error; this.loading.dismiss();
                })
        );
    }

    SendDetail() {
        this.msg = "";
        this.showLoading();
        this.opmodel.StudentModelID = this._crud.getStorage("currentstudentid");
       
        this.loading.present().then(() =>
            this._crud.postwithresponse("onlinepay/Pay", this.opmodel).subscribe(records => {
            
                
                this.openWithInAppBrowser(records._body);
                this.loading.dismiss();
        },
            error => { this.msg = <any>error; this.loading.dismiss(); })
        );
       
    }
    //public openWithSystemBrowser() {
    //    let target = "_system";
    //    this.theInAppBrowser.create('https://ionicframework.com/', target, this.options);
    //}
    openWithInAppBrowser(pageContent) {
        

        //pageContent = '<html> <head></head><body onload="document.form1.submit()"><form name="form1" method="post" action="https://biz.traknpay.in/v1/paymentrequest" ><input name="api_key" type="hidden" value="46e6faab-409a-4b3c-99b3-e7a944d61af7"><input name="return_url" type="hidden" value="http://localhost:51131/api/onlinepay/ReturnAddress"><input name="mode" type="hidden" value="TEST"><input name="order_id" type="hidden" value="901Aug18"><input name="amount" type="hidden" value="56"><input name="name" type="hidden" value="Balram Singh"><input name="currency" type="hidden" value="INR"><input name="description" type="hidden" value="Online payment of fees 7th Class-A(Roll No.: 5)"><input name="address_line_1" type="hidden" value="Ph 11"><input name="phone" type="hidden" value="9878652452"><input name="email" type="hidden" value="test@test.com"><input name="city" type="hidden" value="test"><input name="country" type="hidden" value="IND"><input name="zip_code" type="hidden" value="111111"><input name="udf1" type="hidden" value="sdf"><input name="hash" type="hidden" value="D2BFC42CAC58E664248600B9DAEE3CCE72AD6BC2CA8FD19CD23341732F49098B018D7B32CF637431FEC0C6CC424DDFF4264C61146BEA8707EE96828278F4C2F9"></form></body></html>';
        var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

        this.theInAppBrowser.create(
            pageContentUrl,
            "_blank",
            "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
        );


        //let target = "_blank";
        //this.theInAppBrowser.create('https://ionicframework.com/', target, this.options);
    }
    //public openWithCordovaBrowser() {
    //    let target = "_self";
    //    this.theInAppBrowser.create('https://ionicframework.com/', target, this.options);
    //} 



    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
        });
    }
}
